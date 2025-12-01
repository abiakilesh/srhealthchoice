"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Package } from 'lucide-react';
import { toast } from 'sonner';

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
}

export default function AdminOrders() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    fetchOrders();
  }, [router]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      const data = await response.json();
      setOrders(data.sort((a: Order, b: Order) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ));
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: Order['status']) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error('Failed to update order status');

      toast.success('Order status updated successfully');
      fetchOrders();
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error('Failed to update order status');
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500';
      case 'processing':
        return 'bg-blue-500';
      case 'completed':
        return 'bg-green-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/40">
      <header className="border-b bg-background">
        <div className="container mx-auto flex h-16 items-center px-4">
          <Link href="/admin/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="ml-4 text-xl font-bold">Orders Management</h1>
        </div>
      </header>

      <div className="container mx-auto p-6">
        {orders.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Package className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-lg text-muted-foreground">No orders yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        Order #{order.id}
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        {new Date(order.createdAt).toLocaleString()}
                      </CardDescription>
                    </div>
                    <Select
                      value={order.status}
                      onValueChange={(value) => handleStatusChange(order.id, value as Order['status'])}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="font-semibold mb-2">Customer Details</h3>
                      <div className="space-y-1 text-sm">
                        <p><span className="font-medium">Name:</span> {order.customerName}</p>
                        <p><span className="font-medium">Email:</span> {order.customerEmail}</p>
                        <p><span className="font-medium">Phone:</span> {order.customerPhone}</p>
                        <p><span className="font-medium">Address:</span> {order.customerAddress}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Order Items</h3>
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>{item.productName} x{item.quantity}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                        <div className="border-t pt-2 mt-2">
                          <div className="flex justify-between font-bold">
                            <span>Total</span>
                            <span>${order.totalAmount.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
