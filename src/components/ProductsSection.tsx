import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string | null;
  base_price: number;
  image_url: string | null;
}

const formatPrice = (amount: number) => {
  return `₹${amount.toLocaleString('en-IN')}`;
};

const ProductsSection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('is_active', true)
          .order('created_at');

        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section id="products" className="py-24 bg-secondary border-y-[5px] border-border relative">
      <div className="absolute inset-0 bg-dots opacity-30 pointer-events-none" />
      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-accent text-accent-foreground border-[3px] border-border px-4 py-1 font-bold uppercase tracking-widest text-sm shadow-brutal-sm -rotate-1">
            Our Collection
          </span>
          <h2 className="font-display text-4xl md:text-6xl mt-6 mb-6 text-foreground">
            PREMIUM <span className="inline-block bg-primary text-primary-foreground px-3 border-[4px] border-border shadow-brutal rotate-1">HAIR SYSTEMS</span>
          </h2>
          <p className="text-foreground max-w-2xl mx-auto text-lg font-medium">
            Choose from our range of premium hair systems, crafted for every lifestyle and preference.
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {/* Products Grid */}
        {!loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, index) => {
              const cardBgs = ["bg-card", "bg-accent", "bg-primary", "bg-background"];
              const cardBg = cardBgs[index % cardBgs.length];
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Link to={`/product/${product.id}`}>
                    <div className={`group relative ${cardBg} text-foreground border-[4px] border-border shadow-brutal hover:shadow-brutal-lg hover:-translate-x-1 hover:-translate-y-1 transition-all duration-150 cursor-pointer`}>
                      {/* Product Image */}
                      <div className="relative aspect-square overflow-hidden bg-background border-b-[4px] border-border">
                        <img
                          src={product.image_url || "/placeholder.svg"}
                          alt={`${product.name} - Premium hair system by 3S Golden Hair`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          width={400}
                          height={400}
                        />
                        <div className="absolute top-3 left-3 bg-foreground text-background font-display text-xs px-2 py-1">
                          #{String(index + 1).padStart(2, '0')}
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-5">
                        <h3 className="font-display text-xl mb-2 line-clamp-1 text-foreground">
                          {product.name}
                        </h3>
                        <p className="text-foreground/80 text-sm leading-relaxed mb-4 line-clamp-2 font-medium">
                          {product.description || "Premium quality hair system"}
                        </p>

                        {/* Price */}
                        <div className="pt-4 border-t-[3px] border-border flex items-center justify-between">
                          <span className="font-display text-2xl text-foreground">
                            {formatPrice(product.base_price)}
                          </span>
                          <span className="bg-foreground text-background px-2 py-1 text-xs font-bold uppercase">
                            View →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!loading && products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No products available at the moment.</p>
          </div>
        )}

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