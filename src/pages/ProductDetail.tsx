import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingCart, Package, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchProductByHandle, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct['node'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const loadProduct = async () => {
      if (!handle) return;
      setIsLoading(true);
      const fetchedProduct = await fetchProductByHandle(handle);
      setProduct(fetchedProduct);
      if (fetchedProduct?.variants.edges[0]) {
        setSelectedVariant(fetchedProduct.variants.edges[0].node.id);
      }
      setIsLoading(false);
    };
    loadProduct();
  }, [handle]);

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;

    const variant = product.variants.edges.find(v => v.node.id === selectedVariant)?.node;
    if (!variant) return;

    const shopifyProduct: ShopifyProduct = {
      node: product
    };

    addItem({
      product: shopifyProduct,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });

    toast.success("Added to cart", {
      description: product.title,
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

  const currentVariant = product?.variants.edges.find(v => v.node.id === selectedVariant)?.node;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Fixed Cart Button */}
      <div className="fixed top-6 right-20 z-50">
        <CartDrawer />
      </div>

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back Link */}
          <Link 
            to="/#products" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>

          {isLoading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : !product ? (
            <div className="text-center py-24">
              <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="font-display text-2xl font-bold mb-2">Product Not Found</h2>
              <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
              <Link to="/">
                <Button variant="gold">Return Home</Button>
              </Link>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid lg:grid-cols-2 gap-12"
            >
              {/* Product Images */}
              <div className="space-y-4">
                <div className="aspect-square rounded-2xl overflow-hidden bg-card border border-border/50">
                  {product.images.edges[selectedImage]?.node ? (
                    <img
                      src={product.images.edges[selectedImage].node.url}
                      alt={product.images.edges[selectedImage].node.altText || product.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-secondary/50">
                      <Package className="w-24 h-24 text-muted-foreground" />
                    </div>
                  )}
                </div>

                {/* Thumbnail Gallery */}
                {product.images.edges.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {product.images.edges.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage === index
                            ? "border-primary"
                            : "border-border/50 hover:border-border"
                        }`}
                      >
                        <img
                          src={img.node.url}
                          alt={img.node.altText || `${product.title} thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                    {product.title}
                  </h1>
                  {currentVariant && (
                    <p className="font-display text-3xl font-bold text-gradient-gold">
                      {formatPrice(currentVariant.price.amount, currentVariant.price.currencyCode)}
                    </p>
                  )}
                </div>

                <p className="text-muted-foreground text-lg leading-relaxed">
                  {product.description || "Premium quality hair system crafted for natural look and comfort."}
                </p>

                {/* Variant Selection */}
                {product.variants.edges.length > 1 && (
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground">
                      Select Option
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.edges.map((variant) => (
                        <button
                          key={variant.node.id}
                          onClick={() => setSelectedVariant(variant.node.id)}
                          disabled={!variant.node.availableForSale}
                          className={`px-4 py-2 rounded-lg border transition-all ${
                            selectedVariant === variant.node.id
                              ? "border-primary bg-primary/10 text-foreground"
                              : variant.node.availableForSale
                              ? "border-border/50 hover:border-primary/50 text-muted-foreground hover:text-foreground"
                              : "border-border/30 text-muted-foreground/50 cursor-not-allowed"
                          }`}
                        >
                          {variant.node.title !== "Default Title" ? variant.node.title : "Standard"}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add to Cart */}
                <Button
                  variant="gold"
                  size="xl"
                  className="w-full"
                  onClick={handleAddToCart}
                  disabled={!currentVariant?.availableForSale}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {currentVariant?.availableForSale ? "Add to Cart" : "Out of Stock"}
                </Button>

                {/* Product Options */}
                {product.options.length > 0 && product.options[0].name !== "Title" && (
                  <div className="pt-6 border-t border-border/50">
                    <h3 className="font-medium text-foreground mb-3">Product Details</h3>
                    <ul className="space-y-2">
                      {product.options.map((option) => (
                        <li key={option.name} className="text-muted-foreground text-sm">
                          <span className="font-medium text-foreground">{option.name}:</span>{" "}
                          {option.values.join(", ")}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
