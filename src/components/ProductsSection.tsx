import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const ProductsSection = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      const fetchedProducts = await fetchProducts(12);
      setProducts(fetchedProducts);
      setIsLoading(false);
    };
    loadProducts();
  }, []);

  const handleAddToCart = (product: ShopifyProduct, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;

    addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });

    toast.success("Added to cart", {
      description: product.node.title,
      position: "top-center",
    });
  };

  const formatPrice = (amount: string, currencyCode: string) => {
    const price = parseFloat(amount);
    if (currencyCode === 'INR') {
      return `₹${price.toLocaleString('en-IN')}`;
    }
    return `${currencyCode} ${price.toFixed(2)}`;
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
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-card rounded-2xl overflow-hidden border border-border/50 animate-pulse">
                <div className="aspect-square bg-secondary/50" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-secondary/50 rounded w-1/4" />
                  <div className="h-6 bg-secondary/50 rounded w-3/4" />
                  <div className="h-4 bg-secondary/50 rounded w-full" />
                  <div className="h-10 bg-secondary/50 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-display text-2xl font-bold mb-2 text-foreground">No Products Yet</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Products will appear here once added to your Shopify store. Tell me what products you'd like to create!
            </p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => {
              const mainImage = product.node.images.edges[0]?.node;
              const price = product.node.priceRange.minVariantPrice;

              return (
                <motion.div
                  key={product.node.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link
                    to={`/product/${product.node.handle}`}
                    className="group relative bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-500 block"
                  >
                    {/* Product Image */}
                    <div className="relative aspect-square overflow-hidden bg-charcoal">
                      {mainImage ? (
                        <img
                          src={mainImage.url}
                          alt={mainImage.altText || product.node.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-secondary/50">
                          <Package className="w-12 h-12 text-muted-foreground" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60 pointer-events-none" />
                    </div>

                    {/* Product Info */}
                    <div className="p-5">
                      <h3 className="font-display text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1">
                        {product.node.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                        {product.node.description || "Premium quality hair system"}
                      </p>

                      {/* Price and CTA */}
                      <div className="flex items-center justify-between pt-4 border-t border-border/50">
                        <span className="font-display text-2xl font-bold text-gradient-gold">
                          {formatPrice(price.amount, price.currencyCode)}
                        </span>
                        <Button 
                          variant="goldOutline" 
                          size="sm"
                          onClick={(e) => handleAddToCart(product, e)}
                        >
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          Add
                        </Button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* View All Button */}
        {products.length > 0 && (
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
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
