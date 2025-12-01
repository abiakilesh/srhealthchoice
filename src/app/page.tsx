"use client"

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, ArrowRight, Star, Phone, Mail, MapPin } from 'lucide-react';
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

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      const featured = data.filter((p: Product) => p.featured).slice(0, 6);
      setFeaturedProducts(featured);
    } catch (error) {
      console.error('Error fetching products:', error);
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

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Welcome to <span className="text-primary">ShopHub</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Discover amazing products with cash-on-delivery. Shop with confidence and pay when you receive.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products">
                <Button size="lg" className="text-lg px-8">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="#featured">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  View Featured
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Cash on Delivery</h3>
              <p className="text-muted-foreground">
                Pay with cash when your order arrives at your doorstep
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Quality Products</h3>
              <p className="text-muted-foreground">
                Curated selection of high-quality products for you
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
              <p className="text-muted-foreground">
                Quick and reliable delivery right to your door
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="featured" className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Products</h2>
              <p className="text-muted-foreground">Handpicked items just for you</p>
            </div>
            <Link href="/products">
              <Button variant="outline">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">Loading products...</p>
            </div>
          ) : featuredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground mb-4">No products available yet</p>
              <Link href="/admin/login">
                <Button variant="outline">Go to Admin Panel</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <Link href={`/products/${product.id}`}>
                    <div className="relative h-64 w-full">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
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
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Browse our complete collection and find what you love
          </p>
          <Link href="/products">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Explore All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-muted-foreground text-lg">We're here to help with any questions</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <a
              href="https://wa.me/919566060685"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center text-center p-6 rounded-lg bg-card hover:shadow-lg transition-shadow group"
            >
              <div className="bg-green-500/10 w-14 h-14 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition-colors">
                <Phone className="h-7 w-7 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">WhatsApp</h3>
              <p className="text-muted-foreground text-sm mb-2">Chat with us</p>
              <p className="font-medium">+91 95660 60685</p>
            </a>

            <a
              href="mailto:srhealthychoice22@gmail.com"
              className="flex flex-col items-center text-center p-6 rounded-lg bg-card hover:shadow-lg transition-shadow group"
            >
              <div className="bg-blue-500/10 w-14 h-14 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                <Mail className="h-7 w-7 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-muted-foreground text-sm mb-2">Send us a message</p>
              <p className="font-medium text-sm break-all">srhealthychoice22@gmail.com</p>
            </a>

            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card hover:shadow-lg transition-shadow">
              <div className="bg-red-500/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-7 w-7 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Location</h3>
              <p className="text-muted-foreground text-sm mb-2">Visit us at</p>
              <p className="font-medium">Gandhi Nagar, Vellore</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}