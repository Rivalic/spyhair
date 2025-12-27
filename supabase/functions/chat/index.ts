import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Allowed origins for CORS - add your production domains here
const allowedOrigins = [
  "https://3sgoldenhair.com",
  "https://www.3sgoldenhair.com",
  "http://localhost:8080",
  "http://localhost:5173",
  "http://localhost:3000",
];

// Also allow Lovable preview domains
function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  
  // Check exact matches
  if (allowedOrigins.includes(origin)) return true;
  
  // Allow Lovable preview domains (*.lovableproject.com, *.lovable.app)
  if (origin.endsWith(".lovableproject.com") || origin.endsWith(".lovable.app")) {
    return true;
  }
  
  return false;
}

function getCorsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get("origin");
  
  // If origin is allowed, return it; otherwise use a safe default
  const allowedOrigin = isAllowedOrigin(origin) ? origin! : allowedOrigins[0];
  
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Credentials": "true",
    "Vary": "Origin",
  };
}

const MAX_MESSAGES = 50;
const MAX_MESSAGE_LENGTH = 10000;
const VALID_ROLES = ["user", "assistant"];

interface ChatMessage {
  role: string;
  content: string;
}

function validateMessages(messages: unknown): { valid: boolean; error?: string; messages?: ChatMessage[] } {
  if (!Array.isArray(messages)) {
    return { valid: false, error: "Messages must be an array" };
  }

  if (messages.length === 0) {
    return { valid: false, error: "Messages array cannot be empty" };
  }

  if (messages.length > MAX_MESSAGES) {
    return { valid: false, error: `Too many messages. Maximum allowed: ${MAX_MESSAGES}` };
  }

  const validatedMessages: ChatMessage[] = [];

  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];

    if (typeof msg !== "object" || msg === null) {
      return { valid: false, error: `Message at index ${i} is invalid` };
    }

    const { role, content } = msg as Record<string, unknown>;

    if (typeof role !== "string" || !VALID_ROLES.includes(role)) {
      return { valid: false, error: `Invalid role at index ${i}. Must be 'user' or 'assistant'` };
    }

    if (typeof content !== "string") {
      return { valid: false, error: `Content at index ${i} must be a string` };
    }

    if (content.length === 0) {
      return { valid: false, error: `Content at index ${i} cannot be empty` };
    }

    if (content.length > MAX_MESSAGE_LENGTH) {
      return { valid: false, error: `Message at index ${i} exceeds maximum length of ${MAX_MESSAGE_LENGTH} characters` };
    }

    validatedMessages.push({ role, content: content.trim() });
  }

  return { valid: true, messages: validatedMessages };
}

const systemPrompt = `You are a friendly and knowledgeable AI assistant for 3S Golden Hair, a premium hair systems company based in India. You help customers with questions about:

**Products & Pricing:**
- Premium non-surgical hair systems (starting from ₹15,000 to ₹50,000+)
- Different base materials: Swiss lace, French lace, Skin/PU, Mono filament
- Hair types: Indian human hair, European hair, synthetic blends
- Customization options: density, color, curl pattern, hairline design

**Services:**
- Free consultations (in-person and virtual)
- Professional fitting and styling
- Maintenance and repair services
- Training for self-application

**Process:**
1. Initial consultation to understand needs
2. Scalp measurement and hair matching
3. Custom hair system creation (2-4 weeks)
4. Professional fitting and styling
5. Aftercare guidance and support

**Key Benefits:**
- 100% undetectable, natural-looking results
- Comfortable for daily wear, swimming, sports
- No surgery, no side effects
- Instant transformation

Be helpful, empathetic, and professional. If asked about specific pricing, provide general ranges and encourage booking a consultation for exact quotes. For complex technical questions or complaints, suggest contacting the team directly.

Keep responses concise but informative. Use a warm, reassuring tone - many customers may feel self-conscious about hair loss.`;

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    
    // Validate input messages
    const validation = validateMessages(body.messages);
    if (!validation.valid) {
      console.error("Input validation failed:", validation.error);
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const messages = validation.messages!;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Starting chat request with", messages.length, "validated messages");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "We're experiencing high demand. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: "Failed to get AI response" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Streaming response started");
    
    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat function error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
