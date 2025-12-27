import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.89.0";

// Allowed origins for CORS
const allowedOrigins = [
  "https://3sgoldenhair.com",
  "https://www.3sgoldenhair.com",
  "http://localhost:8080",
  "http://localhost:5173",
  "http://localhost:3000",
];

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  if (allowedOrigins.includes(origin)) return true;
  if (origin.endsWith(".lovableproject.com") || origin.endsWith(".lovable.app")) {
    return true;
  }
  return false;
}

function getCorsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get("origin");
  const allowedOrigin = isAllowedOrigin(origin) ? origin! : allowedOrigins[0];
  
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Credentials": "true",
    "Vary": "Origin",
  };
}

// Rate limiting configuration
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5; // 5 orders per minute per IP

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimits = new Map<string, RateLimitEntry>();

function getClientIdentifier(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return `order-${forwarded.split(",")[0].trim()}`;
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) {
    return `order-${realIp}`;
  }
  const userAgent = req.headers.get("user-agent") || "unknown";
  const origin = req.headers.get("origin") || "unknown";
  return `order-${origin}-${userAgent.slice(0, 50)}`;
}

function checkRateLimit(identifier: string): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const entry = rateLimits.get(identifier);
  
  // Clean up old entries periodically
  if (rateLimits.size > 10000) {
    for (const [key, val] of rateLimits.entries()) {
      if (now > val.resetAt) {
        rateLimits.delete(key);
      }
    }
  }
  
  if (!entry || now > entry.resetAt) {
    rateLimits.set(identifier, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1, resetAt: now + RATE_LIMIT_WINDOW_MS };
  }
  
  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }
  
  entry.count++;
  return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - entry.count, resetAt: entry.resetAt };
}

interface CreateOrderRequest {
  product_id: string;
  product_name: string;
  product_price: number;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  payment_method: "cod" | "online";
}

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Apply rate limiting
  const clientId = getClientIdentifier(req);
  const rateLimit = checkRateLimit(clientId);
  
  if (!rateLimit.allowed) {
    console.warn(`Rate limit exceeded for client: ${clientId}`);
    return new Response(
      JSON.stringify({ error: "Too many order attempts. Please try again in a moment." }),
      { 
        status: 429, 
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json",
          "Retry-After": String(Math.ceil((rateLimit.resetAt - Date.now()) / 1000)),
        } 
      }
    );
  }

  try {
    const body: CreateOrderRequest = await req.json();
    const {
      product_id,
      product_name,
      product_price,
      customer_name,
      customer_phone,
      customer_address,
      payment_method,
    } = body;

    // Validate product details
    if (!product_id || !product_name || !product_price || product_price <= 0) {
      console.error("Invalid product details:", { product_id, product_name, product_price });
      return new Response(
        JSON.stringify({ error: "Invalid product details" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate customer name
    if (!customer_name || customer_name.trim().length < 2 || customer_name.length > 100) {
      return new Response(
        JSON.stringify({ error: "Please provide a valid name (2-100 characters)" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate phone (Indian format: starts with 6-9, 10 digits)
    const phoneRegex = /^[6-9]\d{9}$/;
    const cleanPhone = customer_phone?.replace(/[\s-]/g, "") || "";
    if (!phoneRegex.test(cleanPhone)) {
      return new Response(
        JSON.stringify({ error: "Please provide a valid 10-digit Indian phone number" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate address
    if (!customer_address || customer_address.trim().length < 10 || customer_address.length > 500) {
      return new Response(
        JSON.stringify({ error: "Please provide a complete delivery address (10-500 characters)" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate payment method
    if (!["online", "cod"].includes(payment_method)) {
      return new Response(
        JSON.stringify({ error: "Invalid payment method" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create Supabase client with service role
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Insert order
    const { data, error } = await supabaseClient
      .from("orders")
      .insert({
        product_id,
        product_name,
        product_price,
        customer_name: customer_name.trim(),
        customer_phone: cleanPhone,
        customer_address: customer_address.trim(),
        payment_method,
        payment_status: payment_method === "cod" ? "pending" : "awaiting",
        order_status: "pending",
      })
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to create order. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("COD order created successfully:", data.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        order_id: data.id,
        message: "Order placed successfully",
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Create order error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
