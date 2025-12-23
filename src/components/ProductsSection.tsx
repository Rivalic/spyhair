import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    name: "LOS ANGELES",
    category: "Best Seller",
    description: "Premium ventilated base with 100% real human hair for natural look.",
    price: "₹8,000",
    rating: 4.9,
    videoId: "lsicg8",
  },
  {
    id: 2,
    name: "AUSTRALIAN PREMIUM",
    category: "Luxury",
    description: "Ultra-light 0.03mm 4D French lace with Grade-7A smooth human hair.",
    price: "₹15,000",
    rating: 5.0,
    videoId: "02ptq8",
  },
  {
    id: 3,
    name: "AUSTRALIAN MIRAGE",
    category: "Durable",
    description: "Premium ultra-natural hair system with 0.09mm 5D tissued base.",
    price: "₹20,000",
    rating: 4.7,
    videoId: "otb2i3",
  },
  {
    id: 4,
    name: "BMW PREMIUM",
    category: "Popular",
    description: "Advanced optical base with Grade-5A matte human hair.",
    price: "₹8,000",
    rating: 4.8,
    videoId: "jwf8r7",
  },
  {
    id: 5,
    name: "Q6 PREMIUM",
    category: "Versatile",
    description: "Ultra-thin 4D French lace with flexible PU coating for durability.",
    price: "₹8,000",
    rating: 4.8,
    videoId: "hksrll",
  },
  {
    id: 6,
    name: "OCTAGON",
    category: "Hybrid",
    description: "Advanced hybrid system with 80% French lace and 20% PU for ultimate durability.",
    price: "₹25,000",
    rating: 5.0,
    videoId: "ik6x7g",
  },
  {
    id: 7,
    name: "GOLDEN MIRAGE PREMIUM",
    category: "Ultra Thin",
    description: "Advanced 0.06mm 7D tissued base with Grade-10A pristine human hair.",
    price: "₹20,000",
    rating: 4.9,
    videoId: "emo4z1",
  },
];

const ProductsSection = () => {
  return (
    <section id="products" className="py-16">
      <div className="container mx-auto px-4">
        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative bg-card rounded-xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300"
            >
              {/* Category Badge */}
              <div className="absolute top-3 left-3 z-10">
                <span className="bg-primary/90 text-primary-foreground text-xs font-medium px-2.5 py-1 rounded-full">
                  {product.category}
                </span>
              </div>

              {/* Video Container */}
              <div className="relative aspect-square overflow-hidden bg-secondary/20">
                <iframe
                  src={`https://streamable.com/e/${product.videoId}?autoplay=1&muted=1&loop=1&controls=0&nocontrols=1`}
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  title={`${product.name} video`}
                />
              </div>

              {/* Product Info */}
              <div className="p-4">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-1.5">
                  <Star className="w-3.5 h-3.5 text-primary fill-primary" />
                  <span className="text-xs font-medium text-foreground">{product.rating}</span>
                </div>

                <h3 className="font-display text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <span className="font-display text-xl font-bold text-gradient-purple">
                    {product.price}
                  </span>
                  <Button variant="goldOutline" size="sm" className="text-xs">
                    Enquire
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
