"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, ShoppingBag, LogOut, LayoutDashboard } from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-muted/40">
      <header className="border-b bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <LayoutDashboard className="h-6 w-6" />
            <span className="text-xl font-bold">Admin Dashboard</span>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Welcome to Admin Panel</h1>
          <p className="text-muted-foreground mt-2">
            Manage your products and orders from here
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/admin/products">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Package className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Product Management</CardTitle>
                    <CardDescription>
                      Add, edit, and manage your products
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Manage Products</Button>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/admin/orders">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <ShoppingBag className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Orders</CardTitle>
                    <CardDescription>
                      View and manage customer orders
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button className="w-full">View Orders</Button>
              </CardContent>
            </Link>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Link href="/admin/products">
              <Button variant="outline">Add New Product</Button>
            </Link>
            <Link href="/">
              <Button variant="outline">View Store</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
