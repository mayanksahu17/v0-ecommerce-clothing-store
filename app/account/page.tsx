"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useCart } from "@/hooks/use-cart"
import Link from "next/link"

export default function AccountPage() {
  const { cart } = useCart()

  return (
    <main className="bg-background">
      <Header />
      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-light mb-12">My Account</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Account Overview */}
            <div className="bg-secondary p-8 space-y-4">
              <h2 className="text-2xl font-light mb-4">Account Overview</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Current Cart Items</span>
                  <span className="font-light">{cart.items.length}</span>
                </div>
                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-4">
                    Sign in to your account to view order history, saved addresses, and manage your preferences.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-block px-6 py-2 bg-foreground text-background hover:bg-accent transition text-sm"
                  >
                    Sign In / Create Account
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-secondary p-8 space-y-4">
              <h2 className="text-2xl font-light mb-4">Quick Links</h2>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/cart" className="hover:underline flex items-center justify-between">
                    <span>Shopping Cart</span>
                    <span className="text-muted-foreground">({cart.items.length} items)</span>
                  </Link>
                </li>
                <li>
                  <Link href="/policies/return-exchange" className="hover:underline">
                    Return/Exchange Items
                  </Link>
                </li>
                <li>
                  <Link href="/policies/shipping" className="hover:underline">
                    Track Your Order
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:underline">
                    Contact Support
                  </Link>
                </li>
              </ul>
            </div>

            {/* Order History */}
            <div className="bg-secondary p-8 space-y-4 md:col-span-2">
              <h2 className="text-2xl font-light mb-4">Order History</h2>
              <div className="text-center py-12">
                <p className="text-sm text-muted-foreground mb-4">
                  You don't have any orders yet. Start shopping to see your order history here.
                </p>
                <Link
                  href="/shop"
                  className="inline-block px-6 py-2 bg-foreground text-background hover:bg-accent transition text-sm"
                >
                  Browse Products
                </Link>
              </div>
            </div>

            {/* Account Settings */}
            <div className="bg-secondary p-8 space-y-4 md:col-span-2">
              <h2 className="text-2xl font-light mb-4">Account Settings</h2>
              <div className="space-y-4 text-sm">
                <div>
                  <label className="block text-muted-foreground mb-2">Email Preferences</label>
                  <p className="text-xs text-muted-foreground mb-3">
                    Manage how you receive updates about new products, promotions, and order updates.
                  </p>
                  <Link
                    href="/contact"
                    className="text-sm underline hover:text-accent"
                  >
                    Update Email Preferences
                  </Link>
                </div>
                <div className="pt-4 border-t border-border">
                  <label className="block text-muted-foreground mb-2">Privacy & Security</label>
                  <p className="text-xs text-muted-foreground mb-3">
                    Review our privacy policy and manage your account security settings.
                  </p>
                  <Link
                    href="/policies/privacy"
                    className="text-sm underline hover:text-accent"
                  >
                    View Privacy Policy
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

