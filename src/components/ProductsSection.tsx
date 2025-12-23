import { motion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    name: "LOS ANGELES",
    category: "Best Seller",
    description: "Premium ventilated base with 100% real human hair for natural look.",
    price: "₹8,000",
    rating: 4.9,
    features: ["100% Real Human Hair", "Ventilated Base", "Natural Look"],
  },
  {
    id: 2,
    name: "AUSTRALIAN PREMIUM",
    category: "Luxury",
    description: "Ultra-light 0.03mm 4D French lace with Grade-7A smooth human hair.",
    price: "₹15,000",
    rating: 5.0,
    features: ["0.03mm Ultra-Light", "4D French Lace", "Grade-7A Hair"],
  },
  {
    id: 3,
    name: "AUSTRALIAN MIRAGE",
    category: "Durable",
    description: "Premium ultra-natural hair system with 0.09mm 5D tissued base.",
    price: "₹20,000",
    rating: 4.7,
    features: ["0.09mm Tissued Base", "5D Technology", "Ultra-Natural"],
  },
  {
    id: 4,
    name: "BMW PREMIUM",
    category: "Popular",
    description: "Advanced optical base with Grade-5A matte human hair.",
    price: "₹8,000",
    rating: 4.8,
    features: ["Optical Base", "Grade-5A Hair", "Matte Finish"],
  },
  {
    id: 5,
    name: "Q6 PREMIUM",
    category: "Versatile",
    description: "Ultra-thin 4D French lace with flexible PU coating for durability.",
    price: "₹8,000",
    rating: 4.8,
    features: ["4D French Lace", "PU Coating", "Flexible Design"],
  },
  {
    id: 6,
    name: "OCTAGON",
    category: "Hybrid",
    description: "Advanced hybrid system with 80% French lace and 20% PU for ultimate durability.",
    price: "₹25,000",
    rating: 5.0,
    features: ["80% French Lace", "20% PU Base", "Ultimate Durability"],
  },
  {
    id: 7,
    name: "GOLDEN MIRAGE PREMIUM",
    category: "Ultra Thin",
    description: "Advanced 0.06mm 7D tissued base with Grade-10A pristine human hair.",
    price: "₹20,000",
    rating: 4.9,
    features: ["0.06mm Base", "7D Tissued", "Grade-10A Hair"],
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
              className="group relative bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-500"
            >
              {/* Category Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-primary/90 text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                  {product.category}
                </span>
              </div>

              {/* Product Placeholder */}
              <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="font-display text-2xl font-bold text-primary">
                      {product.name.charAt(0)}
                    </span>
                  </div>
                  <span className="text-muted-foreground text-sm">Premium Hair System</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
              </div>

              {/* Product Info */}
              <div className="p-5">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 text-primary fill-primary" />
                  <span className="text-sm font-medium text-foreground">{product.rating}</span>
                </div>

                <h3 className="font-display text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {product.features.map((feature, i) => (
                    <span
                      key={i}
                      className="text-xs bg-secondary/50 text-muted-foreground px-2 py-1 rounded-full"
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
                    Enquire
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
          <Button variant="gold" size="xl">
            View All Products
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;
