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
