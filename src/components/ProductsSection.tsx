import { useState } from "react";
import { motion } from "framer-motion";
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
import { Loader2 } from "lucide-react";

// Static products data
const products = [
  {
    id: "1",
    title: "LOS ANGELES",
    description: "Premium quality hair system with natural look",
    price: 8000,
    image: "/placeholder.svg",
  },
  {
    id: "2",
    title: "AUSTRALIAN PREMIUM",
    description: "Premium Australian hair system for maximum comfort",
    price: 15000,
    image: "/placeholder.svg",
  },
  {
    id: "3",
    title: "AUSTRALIAN MIRAGE",
    description: "Undetectable mirage technology hair system",
    price: 20000,
    image: "/placeholder.svg",
  },
  {
    id: "4",
    title: "BMW PREMIUM",
    description: "Luxury premium hair system for discerning clients",
    price: 8000,
    image: "/placeholder.svg",
  },
  {
    id: "5",
    title: "Q6 PREMIUM",
    description: "Advanced Q6 base technology for natural appearance",
    price: 8000,
    image: "/placeholder.svg",
  },
  {
    id: "6",
    title: "OCTAGON",
    description: "Revolutionary octagon design for perfect fit",
    price: 25000,
    image: "/placeholder.svg",
  },
  {
    id: "7",
    title: "GOLDEN MIRAGE PREMIUM",
    description: "Our signature golden mirage collection",
    price: 20000,
    image: "/placeholder.svg",
  },
  {
    id: "8",
    title: "BRITISH MIRAGE",
    description: "Classic British style with modern technology",
    price: 15000,
    image: "/placeholder.svg",
  },
];

const formatPrice = (amount: number) => {
  return `₹${amount.toLocaleString('en-IN')}`;
};

const ProductsSection = () => {
  const { initiatePayment, isLoading, isVerifying } = useRazorpay();
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"online" | "cod">("online");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customerForm, setCustomerForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const handleBuyNow = (product: typeof products[0]) => {
    setSelectedProduct(product);
    setPaymentMethod("online");
    setDialogOpen(true);
  };

  const handleCodOrder = (product: typeof products[0]) => {
    setSelectedProduct(product);
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

    if (!selectedProduct) return;

    if (paymentMethod === "online") {
      // Close dialog and initiate payment
      setDialogOpen(false);
      
      initiatePayment({
        amount: selectedProduct.price,
        productId: selectedProduct.id,
        productName: selectedProduct.title,
        productDescription: selectedProduct.description,
        customerName: customerForm.name.trim(),
        customerPhone: customerForm.phone.replace(/[\s-]/g, ""),
        customerAddress: customerForm.address.trim(),
        onSuccess: (response) => {
          console.log('Payment verified:', response);
          setCustomerForm({ name: "", phone: "", address: "" });
          setSelectedProduct(null);
        },
        onError: (error) => {
          console.error('Payment failed:', error);
        },
      });
    } else {
      // Submit COD order to backend
      setIsSubmitting(true);
      
      try {
        const { data, error } = await supabase.functions.invoke('create-order', {
          body: {
            product_id: selectedProduct.id,
            product_name: selectedProduct.title,
            product_price: selectedProduct.price,
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
          description: `Your order for ${selectedProduct.title} has been confirmed. Order ID: ${data.order_id?.slice(0, 8)}... Pay ${formatPrice(selectedProduct.price)} on delivery.`,
        });
        
        setDialogOpen(false);
        setCustomerForm({ name: "", phone: "", address: "" });
        setSelectedProduct(null);
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
      setSelectedProduct(null);
    }
  };

  return (
    <>
    <section id="products" className="py-24 bg-gradient-dark">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary uppercase tracking-widest text-sm font-medium">
            Our Collection
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
            Premium <span className="text-gradient-gold italic">Hair Systems</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Choose from our range of premium hair systems, crafted for every lifestyle and preference.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="group relative bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-500">
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-charcoal">
                  <img
                    src={product.image}
                    alt={`${product.title} - Premium hair system by 3S Golden Hair`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    width={400}
                    height={400}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60 pointer-events-none" />
                </div>

                {/* Product Info */}
                <div className="p-5">
                  <h3 className="font-display text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1">
                    {product.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Price and CTA */}
                  <div className="flex flex-col gap-3 pt-4 border-t border-border/50">
                    <span className="font-display text-2xl font-bold text-gradient-gold">
                      {formatPrice(product.price)}
                    </span>
                    <div className="flex gap-2">
                      <Button 
                        variant="gold" 
                        size="sm"
                        className="flex-1"
                        onClick={() => handleBuyNow(product)}
                        disabled={isLoading || isVerifying}
                      >
                        {isLoading || isVerifying ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          "Pay Online"
                        )}
                      </Button>
                      <Button 
                        variant="goldOutline" 
                        size="sm"
                        className="flex-1"
                        onClick={() => handleCodOrder(product)}
                        disabled={isLoading || isVerifying}
                      >
                        COD
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a href="#contact">
            <Button variant="gold" size="xl">
              Contact for Custom Orders
            </Button>
          </a>
        </motion.div>
      </div>
    </section>

    {/* Order Dialog */}
    <Dialog open={dialogOpen} onOpenChange={handleDialogClose}>
      <DialogContent className="bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {paymentMethod === "online" ? "Complete Your Purchase" : "Cash on Delivery Order"}
          </DialogTitle>
          <DialogDescription>
            {selectedProduct && (
              <span>
                Order <strong>{selectedProduct.title}</strong> for{" "}
                <strong className="text-primary">{formatPrice(selectedProduct.price)}</strong>
                {paymentMethod === "cod" && " (Pay on delivery)"}
              </span>
            )}
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

export default ProductsSection;
