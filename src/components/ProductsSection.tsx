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
    <section id="products" className="relative py-28 overflow-hidden">
      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] rounded-full bg-emerald/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block glass rounded-full px-4 py-1.5 text-primary uppercase tracking-widest text-xs font-medium mb-5">
            Our Collection
          </span>
          <h2 className="font-display text-4xl md:text-6xl mb-6 text-foreground">
            Premium <span className="text-gradient-gold italic">Hair Systems</span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg font-light">
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Link to={`/product/${product.id}`}>
                  <div className="group relative glass rounded-3xl overflow-hidden transition-glass hover:-translate-y-2 hover:bg-white/10 cursor-pointer h-full">
                    {/* Product Image */}
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={product.image_url || "/placeholder.svg"}
                        alt={`${product.name} - Premium hair system by 3S Golden Hair`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                        width={400}
                        height={400}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3 glass-gold rounded-full px-3 py-1 text-xs font-medium text-primary">
                        #{String(index + 1).padStart(2, '0')}
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-5">
                      <h3 className="font-display text-xl mb-2 line-clamp-1 text-foreground group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-foreground/70 text-sm leading-relaxed mb-4 line-clamp-2 font-light">
                        {product.description || "Premium quality hair system"}
                      </p>

                      {/* Price */}
                      <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                        <span className="font-display text-2xl text-gradient-gold">
                          {formatPrice(product.base_price)}
                        </span>
                        <span className="glass rounded-full px-3 py-1 text-xs font-medium text-foreground/80 group-hover:text-primary transition-colors">
                          View →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
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
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <a href="#contact">
            <Button variant="gold" size="xl" className="rounded-full">
              Contact for Custom Orders
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;
