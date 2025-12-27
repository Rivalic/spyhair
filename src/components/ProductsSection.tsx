import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRazorpay } from "@/hooks/useRazorpay";

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
  const { initiatePayment, isLoading } = useRazorpay();

  const handleBuyNow = (product: typeof products[0]) => {
    initiatePayment({
      amount: product.price,
      productName: product.title,
      productDescription: product.description,
      onSuccess: (response) => {
        console.log('Payment successful:', response);
      },
    });
  };

  return (
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
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <span className="font-display text-2xl font-bold text-gradient-gold">
                      {formatPrice(product.price)}
                    </span>
                    <div className="flex gap-2">
                      <Button 
                        variant="gold" 
                        size="sm"
                        onClick={() => handleBuyNow(product)}
                        disabled={isLoading}
                      >
                        {isLoading ? 'Processing...' : 'Buy Now'}
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
  );
};

export default ProductsSection;
