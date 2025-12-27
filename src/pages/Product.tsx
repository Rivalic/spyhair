import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { useRazorpay } from "@/hooks/useRazorpay";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowLeft, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Product {
  id: string;
  name: string;
  description: string | null;
  base_price: number;
  image_url: string | null;
}

interface ProductVariant {
  id: string;
  name: string;
  price: number;
  product_id: string;
}

const formatPrice = (amount: number) => {
  return `₹${amount.toLocaleString('en-IN')}`;
};

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const { initiatePayment, isLoading, isVerifying } = useRazorpay();
  const { toast } = useToast();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"online" | "cod">("online");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customerForm, setCustomerForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        // Fetch product
        const { data: productData, error: productError } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .maybeSingle();

        if (productError) throw productError;
        if (!productData) {
          setProduct(null);
          return;
        }

        setProduct(productData);

        // Fetch variants
        const { data: variantsData, error: variantsError } = await supabase
          .from('product_variants')
          .select('*')
          .eq('product_id', id)
          .order('name');

        if (variantsError) throw variantsError;
        setVariants(variantsData || []);
        
        // Select first variant by default
        if (variantsData && variantsData.length > 0) {
          setSelectedVariant(variantsData[0]);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        toast({
          title: "Error",
          description: "Failed to load product details",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, toast]);

  const handleBuyNow = () => {
    setPaymentMethod("online");
    setDialogOpen(true);
  };

  const handleCodOrder = () => {
    setPaymentMethod("cod");
    setDialogOpen(true);
  };

  const validateForm = (): string | null => {
    if (!customerForm.name || customerForm.name.trim().length < 2) {
      return "Please enter a valid name (at least 2 characters)";
    }
    
    const phoneRegex = /^[6-9]\d{9}$/;
    const cleanPhone = customerForm.phone.replace(/[\s-]/g, "");
    if (!phoneRegex.test(cleanPhone)) {
      return "Please enter a valid 10-digit Indian phone number";
    }
    
    if (!customerForm.address || customerForm.address.trim().length < 10) {
      return "Please enter a complete delivery address (at least 10 characters)";
    }
    
    return null;
  };

  const getCurrentPrice = () => {
    if (selectedVariant) return selectedVariant.price;
    if (product) return product.base_price;
    return 0;
  };

  const getProductName = () => {
    if (!product) return "";
    if (selectedVariant) return `${product.name} - ${selectedVariant.name}`;
    return product.name;
  };

  const handleSubmit = async () => {
    const validationError = validateForm();
    if (validationError) {
      toast({
        title: "Invalid Information",
        description: validationError,
        variant: "destructive",
      });
      return;
    }

    if (!product) return;

    const price = getCurrentPrice();
    const productName = getProductName();

    if (paymentMethod === "online") {
      setDialogOpen(false);
      
      initiatePayment({
        amount: price,
        productId: product.id,
        productName: productName,
        productDescription: product.description || "",
        customerName: customerForm.name.trim(),
        customerPhone: customerForm.phone.replace(/[\s-]/g, ""),
        customerAddress: customerForm.address.trim(),
        onSuccess: (response) => {
          console.log('Payment verified:', response);
          setCustomerForm({ name: "", phone: "", address: "" });
        },
        onError: (error) => {
          console.error('Payment failed:', error);
        },
      });
    } else {
      setIsSubmitting(true);
      
      try {
        const { data, error } = await supabase.functions.invoke('create-order', {
          body: {
            product_id: product.id,
            product_name: productName,
            product_price: price,
            customer_name: customerForm.name.trim(),
            customer_phone: customerForm.phone.replace(/[\s-]/g, ""),
            customer_address: customerForm.address.trim(),
            payment_method: 'cod',
          },
        });

        if (error) {
          throw new Error(error.message || 'Failed to place order');
        }

        if (data?.error) {
          throw new Error(data.error);
        }

        toast({
          title: "COD Order Placed!",
          description: `Your order for ${productName} has been confirmed. Order ID: ${data.order_id?.slice(0, 8)}... Pay ${formatPrice(price)} on delivery.`,
        });
        
        setDialogOpen(false);
        setCustomerForm({ name: "", phone: "", address: "" });
      } catch (error) {
        console.error('COD order error:', error);
        toast({
          title: "Order Failed",
          description: error instanceof Error ? error.message : "Please try again",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleDialogClose = (open: boolean) => {
    if (!open && !isSubmitting) {
      setDialogOpen(false);
      setCustomerForm({ name: "", phone: "", address: "" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
          <Link to="/#products">
            <Button variant="gold">Back to Products</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{product.name} | 3S Golden Hair - Premium Hair Systems</title>
        <meta name="description" content={product.description || `Buy ${product.name} - Premium quality hair system from 3S Golden Hair`} />
      </Helmet>

      <Navbar />
      
      <main className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-12">
          {/* Back Button */}
          <Link to="/#products" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden bg-charcoal border border-border/50">
                <img
                  src={product.image_url || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Product Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col"
            >
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                {product.name}
              </h1>
              
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                {product.description || "Premium quality hair system with natural look and feel."}
              </p>

              {/* Size Variants */}
              {variants.length > 0 && (
                <div className="mb-8">
                  <Label className="text-lg font-semibold mb-4 block">Select Size</Label>
                  <div className="flex flex-wrap gap-3">
                    {variants.map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant)}
                        className={`px-4 py-2 rounded-lg border-2 transition-all ${
                          selectedVariant?.id === variant.id
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <span className="font-medium">{variant.name}</span>
                        {selectedVariant?.id === variant.id && (
                          <Check className="inline-block ml-2 h-4 w-4" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Price */}
              <div className="mb-8">
                <span className="font-display text-4xl font-bold text-gradient-gold">
                  {formatPrice(getCurrentPrice())}
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="gold"
                  size="xl"
                  className="flex-1"
                  onClick={handleBuyNow}
                  disabled={isLoading || isVerifying}
                >
                  {isLoading || isVerifying ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    "Pay Online"
                  )}
                </Button>
                <Button
                  variant="goldOutline"
                  size="xl"
                  className="flex-1"
                  onClick={handleCodOrder}
                  disabled={isLoading || isVerifying}
                >
                  Cash on Delivery
                </Button>
              </div>

              {/* Features */}
              <div className="mt-12 pt-8 border-t border-border/50">
                <h3 className="font-display text-xl font-semibold mb-4">Product Features</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                    100% Natural Human Hair
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                    Undetectable Skin-like Base
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                    Custom Color Matching Available
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                    Free Installation Guide
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Order Dialog */}
      <Dialog open={dialogOpen} onOpenChange={handleDialogClose}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              {paymentMethod === "online" ? "Complete Your Purchase" : "Cash on Delivery Order"}
            </DialogTitle>
            <DialogDescription>
              <span>
                Order <strong>{getProductName()}</strong> for{" "}
                <strong className="text-primary">{formatPrice(getCurrentPrice())}</strong>
                {paymentMethod === "cod" && " (Pay on delivery)"}
              </span>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="customer-name">Full Name *</Label>
              <Input
                id="customer-name"
                placeholder="Enter your full name"
                value={customerForm.name}
                onChange={(e) => setCustomerForm({ ...customerForm, name: e.target.value })}
                disabled={isSubmitting}
                maxLength={100}
              />
            </div>
            <div>
              <Label htmlFor="customer-phone">Phone Number *</Label>
              <Input
                id="customer-phone"
                placeholder="Enter 10-digit phone number"
                value={customerForm.phone}
                onChange={(e) => setCustomerForm({ ...customerForm, phone: e.target.value })}
                disabled={isSubmitting}
                maxLength={15}
              />
            </div>
            <div>
              <Label htmlFor="customer-address">Delivery Address *</Label>
              <Input
                id="customer-address"
                placeholder="Enter your complete delivery address"
                value={customerForm.address}
                onChange={(e) => setCustomerForm({ ...customerForm, address: e.target.value })}
                disabled={isSubmitting}
                maxLength={500}
              />
            </div>
            <Button 
              variant="gold" 
              className="w-full" 
              onClick={handleSubmit}
              disabled={isSubmitting || isLoading}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Placing Order...
                </>
              ) : paymentMethod === "online" ? (
                "Proceed to Payment"
              ) : (
                "Place COD Order"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Product;