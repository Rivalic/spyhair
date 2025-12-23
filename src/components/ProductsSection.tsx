import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";

const products = [
  {
    id: 1,
    name: "Executive Classic",
    category: "Full Cap System",
    description: "Our signature piece for the modern professional. Ultra-thin base with natural hairline.",
    price: "₹45,000",
    image: product1,
    features: ["100% Indian Remy Hair", "Swiss Lace Front", "6-8 Month Durability"],
  },
  {
    id: 2,
    name: "Royal Crown",
    category: "Premium Collection",
    description: "For those who demand the finest. Hand-tied knots with undetectable density gradation.",
    price: "₹65,000",
    image: product2,
    features: ["European Virgin Hair", "Invisible Skin Base", "Custom Color Match"],
  },
  {
    id: 3,
    name: "Natural Blend",
    category: "Everyday Comfort",
    description: "Perfect balance of style and practicality. Lightweight and breathable for daily wear.",
    price: "₹35,000",
    image: product3,
    features: ["Natural Black Shades", "Quick Attachment", "Easy Maintenance"],
  },
];

const ProductsSection = () => {
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
            Each piece is meticulously crafted to deliver an undetectable, natural appearance
            that moves and styles just like your own hair.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-500"
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                
                {/* Quick View Button */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <Button variant="gold" size="lg" className="gap-2">
                    View Details
                    <ArrowUpRight className="w-4 h-4" />
                  </Button>
                </motion.div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <span className="text-primary text-sm font-medium uppercase tracking-wider">
                  {product.category}
                </span>
                <h3 className="font-display text-2xl font-bold mt-2 mb-3 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {product.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.features.map((feature, i) => (
                    <span
                      key={i}
                      className="text-xs bg-secondary/50 text-muted-foreground px-3 py-1 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <span className="font-display text-2xl font-bold text-gradient-gold">
                    {product.price}
                  </span>
                  <Button variant="goldOutline" size="sm">
                    Enquire Now
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Button variant="elegant" size="xl">
            View All Products
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;
