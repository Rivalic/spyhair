import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Plus, Trash2, Edit, Package, ArrowLeft, ChevronDown, ChevronUp, Video } from 'lucide-react';

interface ProductVariant {
  id: string;
  product_id: string;
  name: string;
  price: number;
  sku: string | null;
  stock_quantity: number;
  created_at: string;
}

interface Product {
  id: string;
  name: string;
  description: string | null;
  base_price: number;
  image_url: string | null;
  video_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  variants?: ProductVariant[];
}

const AdminProducts = () => {
  const { user, loading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
  
  // Product form state
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    base_price: '',
    image_url: '',
    video_url: '',
    is_active: true,
  });
  
  // Variant form state
  const [isVariantDialogOpen, setIsVariantDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [variantForm, setVariantForm] = useState({
    name: '',
    price: '',
    sku: '',
    stock_quantity: '0',
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    } else if (!loading && user && !isAdmin) {
      navigate('/');
      toast.error('Access denied. Admin privileges required.');
    }
  }, [user, loading, isAdmin, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchProducts();
    }
  }, [isAdmin]);

  const fetchProducts = async () => {
    setLoadingProducts(true);
    const { data: productsData, error: productsError } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (productsError) {
      toast.error('Failed to fetch products');
      setLoadingProducts(false);
      return;
    }

    const { data: variantsData, error: variantsError } = await supabase
      .from('product_variants')
      .select('*')
      .order('created_at', { ascending: true });

    if (variantsError) {
      toast.error('Failed to fetch variants');
    }

    const productsWithVariants = (productsData || []).map(product => ({
      ...product,
      variants: (variantsData || []).filter(v => v.product_id === product.id),
    }));

    setProducts(productsWithVariants);
    setLoadingProducts(false);
  };

  const resetProductForm = () => {
    setProductForm({
      name: '',
      description: '',
      base_price: '',
      image_url: '',
      video_url: '',
      is_active: true,
    });
    setEditingProduct(null);
  };

  const openEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description || '',
      base_price: String(product.base_price),
      image_url: product.image_url || '',
      video_url: product.video_url || '',
      is_active: product.is_active,
    });
    setIsProductDialogOpen(true);
  };

  const handleSaveProduct = async () => {
    if (!productForm.name.trim()) {
      toast.error('Product name is required');
      return;
    }

    const productData = {
      name: productForm.name.trim(),
      description: productForm.description.trim() || null,
      base_price: parseInt(productForm.base_price) || 0,
      image_url: productForm.image_url.trim() || null,
      video_url: productForm.video_url.trim() || null,
      is_active: productForm.is_active,
    };

    if (editingProduct) {
      const { error } = await supabase
        .from('products')
        .update(productData)
        .eq('id', editingProduct.id);

      if (error) {
        toast.error('Failed to update product');
        return;
      }
      toast.success('Product updated');
    } else {
      const { error } = await supabase
        .from('products')
        .insert(productData);

      if (error) {
        toast.error('Failed to create product');
        return;
      }
      toast.success('Product created');
    }

    setIsProductDialogOpen(false);
    resetProductForm();
    fetchProducts();
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Are you sure? This will also delete all variants.')) return;

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId);

    if (error) {
      toast.error('Failed to delete product');
      return;
    }

    toast.success('Product deleted');
    fetchProducts();
  };

  const openAddVariant = (productId: string) => {
    setSelectedProductId(productId);
    setVariantForm({
      name: '',
      price: '',
      sku: '',
      stock_quantity: '0',
    });
    setIsVariantDialogOpen(true);
  };

  const handleSaveVariant = async () => {
    if (!variantForm.name.trim() || !selectedProductId) {
      toast.error('Variant name is required');
      return;
    }

    const { error } = await supabase
      .from('product_variants')
      .insert({
        product_id: selectedProductId,
        name: variantForm.name.trim(),
        price: parseInt(variantForm.price) || 0,
        sku: variantForm.sku.trim() || null,
        stock_quantity: parseInt(variantForm.stock_quantity) || 0,
      });

    if (error) {
      toast.error('Failed to create variant');
      return;
    }

    toast.success('Variant added');
    setIsVariantDialogOpen(false);
    fetchProducts();
  };

  const handleDeleteVariant = async (variantId: string) => {
    if (!confirm('Delete this variant?')) return;

    const { error } = await supabase
      .from('product_variants')
      .delete()
      .eq('id', variantId);

    if (error) {
      toast.error('Failed to delete variant');
      return;
    }

    toast.success('Variant deleted');
    fetchProducts();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/admin/orders')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Product Management</h1>
              <p className="text-muted-foreground">Add, edit, and manage products with variants</p>
            </div>
          </div>
          
          <Dialog open={isProductDialogOpen} onOpenChange={(open) => {
            setIsProductDialogOpen(open);
            if (!open) resetProductForm();
          }}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    placeholder="Enter product name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    placeholder="Enter product description"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="base_price">Base Price (₹)</Label>
                  <Input
                    id="base_price"
                    type="number"
                    value={productForm.base_price}
                    onChange={(e) => setProductForm({ ...productForm, base_price: e.target.value })}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image_url">Image URL</Label>
                  <Input
                    id="image_url"
                    value={productForm.image_url}
                    onChange={(e) => setProductForm({ ...productForm, image_url: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="video_url">Video URL (Streamable)</Label>
                  <Input
                    id="video_url"
                    value={productForm.video_url}
                    onChange={(e) => setProductForm({ ...productForm, video_url: e.target.value })}
                    placeholder="https://streamable.com/e/xxxxx"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="is_active">Active</Label>
                  <Switch
                    id="is_active"
                    checked={productForm.is_active}
                    onCheckedChange={(checked) => setProductForm({ ...productForm, is_active: checked })}
                  />
                </div>
                <Button onClick={handleSaveProduct} className="w-full">
                  {editingProduct ? 'Update Product' : 'Create Product'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {loadingProducts ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : products.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No products yet</h3>
              <p className="text-muted-foreground mb-4">Get started by adding your first product</p>
              <Button onClick={() => setIsProductDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <Card key={product.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setExpandedProduct(expandedProduct === product.id ? null : product.id)}
                        className="p-1 hover:bg-muted rounded"
                      >
                        {expandedProduct === product.id ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </button>
                      <div className="flex items-center gap-3">
                        {product.video_url && (
                          <Video className="h-4 w-4 text-primary" />
                        )}
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            {product.name}
                            {!product.is_active && (
                              <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">
                                Inactive
                              </span>
                            )}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">
                            Base: ₹{product.base_price.toLocaleString()} • {product.variants?.length || 0} variants
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => openEditProduct(product)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                {expandedProduct === product.id && (
                  <CardContent>
                    {product.video_url && (
                      <div className="mb-4 rounded-lg overflow-hidden aspect-video max-w-md">
                        <iframe
                          src={`${product.video_url}?autoplay=1&muted=1&loop=1&controls=0`}
                          className="w-full h-full"
                          allow="autoplay; fullscreen"
                          allowFullScreen
                        />
                      </div>
                    )}
                    
                    {product.description && (
                      <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                    )}
                    
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">Variants</h4>
                      <Button variant="outline" size="sm" onClick={() => openAddVariant(product.id)}>
                        <Plus className="h-4 w-4 mr-1" />
                        Add Variant
                      </Button>
                    </div>
                    
                    {product.variants && product.variants.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>SKU</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {product.variants.map((variant) => (
                            <TableRow key={variant.id}>
                              <TableCell className="font-medium">{variant.name}</TableCell>
                              <TableCell>₹{variant.price.toLocaleString()}</TableCell>
                              <TableCell>{variant.sku || '-'}</TableCell>
                              <TableCell>{variant.stock_quantity}</TableCell>
                              <TableCell>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteVariant(variant.id)}
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No variants yet. Add variants to offer different options.
                      </p>
                    )}
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}

        {/* Variant Dialog */}
        <Dialog open={isVariantDialogOpen} onOpenChange={setIsVariantDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add Variant</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="variant_name">Variant Name *</Label>
                <Input
                  id="variant_name"
                  value={variantForm.name}
                  onChange={(e) => setVariantForm({ ...variantForm, name: e.target.value })}
                  placeholder="e.g., Small, Medium, Large"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="variant_price">Price (₹)</Label>
                <Input
                  id="variant_price"
                  type="number"
                  value={variantForm.price}
                  onChange={(e) => setVariantForm({ ...variantForm, price: e.target.value })}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="variant_sku">SKU</Label>
                <Input
                  id="variant_sku"
                  value={variantForm.sku}
                  onChange={(e) => setVariantForm({ ...variantForm, sku: e.target.value })}
                  placeholder="Optional SKU code"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="variant_stock">Stock Quantity</Label>
                <Input
                  id="variant_stock"
                  type="number"
                  value={variantForm.stock_quantity}
                  onChange={(e) => setVariantForm({ ...variantForm, stock_quantity: e.target.value })}
                  placeholder="0"
                />
              </div>
              <Button onClick={handleSaveVariant} className="w-full">
                Add Variant
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminProducts;
