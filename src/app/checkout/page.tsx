"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/contexts/CartContext';
import { ArrowLeft, CreditCard } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Link href="/products">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create order
      const orderData = {
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        customerAddress: formData.address,
        items: items.map((item) => ({
          productId: item.id,
          productName: item.name,
          quantity: item.quantity,
          price: item.discountPrice || item.price,
        })),
        totalAmount: totalPrice,
      };

      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (!orderResponse.ok) throw new Error('Failed to create order');

      const order = await orderResponse.json();

      // Send notifications
      try {
        await fetch('/api/notifications', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order, method: 'both' }),
        });
      } catch (error) {
        console.error('Notification error:', error);
      }

      clearCart();
      toast.success('Order placed successfully!');
      router.push(`/order-success?orderId=${order.id}`);
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link href="/cart">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cart
          </Button>
        </Link>

        <h1 className="text-4xl font-bold mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Cash on Delivery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        placeholder="john@example.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                        placeholder="+1 234 567 8900"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Delivery Address *</Label>
                      <Textarea
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        required
                        placeholder="Street address, city, state, zip code"
                        rows={4}
                      />
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Payment Method</h3>
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      <span>Cash on Delivery</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Pay with cash when you receive your order
                    </p>
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={loading}>
                    {loading ? 'Placing Order...' : 'Place Order'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {items.map((item) => {
                    const itemPrice = item.discountPrice || item.price;
                    return (
                      <div key={item.id} className="flex gap-3">
                        <div className="relative h-16 w-16 flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium line-clamp-2">{item.name}</p>
                          <div className="flex justify-between text-sm mt-1">
                            <span className="text-muted-foreground">Qty: {item.quantity}</span>
                            <span className="font-medium">${(itemPrice * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
