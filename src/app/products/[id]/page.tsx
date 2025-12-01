"use client"

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { ArrowLeft, ShoppingCart, Minus, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  stock: number;
  image: string;
  category: string;
  featured: boolean;
}

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [params.id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${params.id}`);
      if (!response.ok) throw new Error('Product not found');
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      discountPrice: product.discountPrice,
      image: product.image,
    }, quantity);
    
    toast.success(`Added ${quantity} item(s) to cart!`);
  };

  const incrementQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link href="/products">
          <Button>Back to Products</Button>
        </Link>
      </div>
    );
  }

  const finalPrice = product.discountPrice || product.price;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link href="/products">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative aspect-square w-full overflow-hidden rounded-lg">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            {product.featured && (
              <Badge className="absolute top-4 right-4">Featured</Badge>
            )}
            {product.discountPrice && (
              <Badge className="absolute top-4 left-4 bg-red-500">
                {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
              </Badge>
            )}
          </div>

          <div className="flex flex-col">
            <div className="mb-4">
              <Badge variant="outline" className="mb-2">{product.category}</Badge>
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
              <p className="text-muted-foreground text-lg">{product.description}</p>
            </div>

            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    {product.discountPrice ? (
                      <div>
                        <div className="text-3xl font-bold">${product.discountPrice}</div>
                        <div className="text-lg line-through text-muted-foreground">
                          ${product.price}
                        </div>
                      </div>
                    ) : (
                      <div className="text-3xl font-bold">${product.price}</div>
                    )}
                  </div>
                  <div>
                    {product.stock > 0 ? (
                      <Badge variant="outline">{product.stock} in stock</Badge>
                    ) : (
                      <Badge variant="destructive">Out of Stock</Badge>
                    )}
                  </div>
                </div>

                {product.stock > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <span className="font-medium">Quantity:</span>
                      <div className="flex items-center border rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={decrementQuantity}
                          disabled={quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="px-4 font-medium">{quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={incrementQuantity}
                          disabled={quantity >= product.stock}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="text-lg font-semibold">
                      Total: ${(finalPrice * quantity).toFixed(2)}
                    </div>

                    <Button
                      size="lg"
                      className="w-full"
                      onClick={handleAddToCart}
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Add to Cart
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="text-sm text-muted-foreground">
              <p>✓ Cash on Delivery Available</p>
              <p>✓ Easy Returns</p>
              <p>✓ Secure Checkout</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
