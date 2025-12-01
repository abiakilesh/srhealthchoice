"use client"

import Link from 'next/link';
import { ShoppingCart, Store } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Store className="h-6 w-6" />
          <span className="text-xl font-bold">ShopHub</span>
        </Link>
        
        <div className="flex items-center space-x-6">
          <Link href="/products" className="text-sm font-medium hover:text-primary">
            Products
          </Link>
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge 
                  className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  variant="destructive"
                >
                  {totalItems}
                </Badge>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
