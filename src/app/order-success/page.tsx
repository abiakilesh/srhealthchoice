"use client"

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Package } from 'lucide-react';

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle2 className="h-16 w-16 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-3xl">Order Placed Successfully!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-muted-foreground mb-2">
                Thank you for your order. We've received it and will process it shortly.
              </p>
              {orderId && (
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Order ID</p>
                  <p className="text-xl font-bold">#{orderId}</p>
                </div>
              )}
            </div>

            <div className="bg-muted/50 p-6 rounded-lg space-y-3">
              <div className="flex items-start gap-3">
                <Package className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-semibold">What's Next?</h3>
                  <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                    <li>✓ You'll receive a confirmation email shortly</li>
                    <li>✓ We'll prepare your order for delivery</li>
                    <li>✓ Pay with cash when your order arrives</li>
                    <li>✓ The admin will contact you to confirm delivery details</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link href="/products" className="flex-1">
                <Button variant="outline" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
              <Link href="/" className="flex-1">
                <Button className="w-full">
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
