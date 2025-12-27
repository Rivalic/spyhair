import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { crypto } from "https://deno.land/std@0.168.0/crypto/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.89.0";

// Helper function to create HMAC SHA256
async function createHmacSha256(key: string, message: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(key);
  const messageData = encoder.encode(message);
  
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  
  const signature = await crypto.subtle.sign("HMAC", cryptoKey, messageData);
  return Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

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

interface VerifyPaymentRequest {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
  order_id: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  product_id: string;
  product_name: string;
  product_price: number;
}

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body: VerifyPaymentRequest = await req.json();
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      order_id,
      customer_name,
      customer_phone,
      customer_address,
      product_id,
      product_name,
      product_price,
    } = body;

    // Validate required fields
    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      console.error("Missing payment verification fields");
      return new Response(
        JSON.stringify({ verified: false, error: "Missing payment details" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate customer details
    if (!customer_name || customer_name.length < 2 || customer_name.length > 100) {
      return new Response(
        JSON.stringify({ verified: false, error: "Invalid customer name" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    const cleanPhone = customer_phone?.replace(/[\s-]/g, "") || "";
    if (!phoneRegex.test(cleanPhone)) {
      return new Response(
        JSON.stringify({ verified: false, error: "Invalid phone number" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!customer_address || customer_address.length < 10) {
      return new Response(
        JSON.stringify({ verified: false, error: "Please provide a complete address" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const keySecret = Deno.env.get("RAZORPAY_KEY_SECRET");
    if (!keySecret) {
      console.error("RAZORPAY_KEY_SECRET not configured");
      return new Response(
        JSON.stringify({ verified: false, error: "Configuration error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Verify signature as per Razorpay documentation
    const signaturePayload = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = await createHmacSha256(keySecret, signaturePayload);

    const isVerified = expectedSignature === razorpay_signature;

    console.log("Payment verification:", {
      razorpay_order_id,
      razorpay_payment_id,
      verified: isVerified,
    });

    if (!isVerified) {
      console.error("Signature verification failed");
      return new Response(
        JSON.stringify({ verified: false, error: "Payment verification failed" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create Supabase client to store the verified order
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Store the verified order in the database
    const { data: orderData, error: orderError } = await supabaseClient
      .from("orders")
      .insert({
        product_id,
        product_name,
        product_price,
        customer_name,
        customer_phone: cleanPhone,
        customer_address,
        payment_method: "online",
        payment_status: "completed",
        order_status: "confirmed",
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        verified_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (orderError) {
      console.error("Failed to store order:", orderError);
      // Payment was verified but order storage failed - still return verified
      // The payment is real, we should not fail the user
      return new Response(
        JSON.stringify({ 
          verified: true, 
          warning: "Payment verified but order storage failed. Please contact support.",
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Order stored successfully:", orderData.id);

    return new Response(
      JSON.stringify({ 
        verified: true, 
        order_id: orderData.id,
        message: "Payment verified and order confirmed",
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Payment verification error:", error);
    return new Response(
      JSON.stringify({ verified: false, error: "Verification failed" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
