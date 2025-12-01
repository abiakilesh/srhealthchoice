"use client"

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart } from 'lucide-react';
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

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      discountPrice: product.discountPrice,
      image: product.image,
    });
    toast.success('Added to cart!');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">All Products</h1>
        
        {products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">No products available yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <Link href={`/products/${product.id}`}>
                  <div className="relative h-64 w-full">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    {product.featured && (
                      <Badge className="absolute top-2 right-2">Featured</Badge>
                    )}
                    {product.discountPrice && (
                      <Badge className="absolute top-2 left-2 bg-red-500">
                        {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                      </Badge>
                    )}
                  </div>
                </Link>
                <CardContent className="p-4">
                  <Link href={`/products/${product.id}`}>
                    <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      {product.discountPrice ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold">${product.discountPrice}</span>
                          <span className="text-sm line-through text-muted-foreground">
                            ${product.price}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xl font-bold">${product.price}</span>
                      )}
                    </div>
                    {product.stock > 0 ? (
                      <span className="text-xs text-muted-foreground">
                        {product.stock} in stock
                      </span>
                    ) : (
                      <Badge variant="destructive">Out of Stock</Badge>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button
                    className="w-full"
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
