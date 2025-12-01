import type { Metadata } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import { CartProvider } from "@/contexts/CartContext";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "ShopHub - Your E-commerce Store",
  description: "Shop with confidence. Cash on delivery available.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ErrorReporter />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        <CartProvider>
          <Navbar />
          {children}
          <Toaster />
        </CartProvider>
        <VisualEditsMessenger />
      </body>
    </html>
  );
}