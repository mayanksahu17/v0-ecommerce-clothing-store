import Link from "next/link"
import { Instagram, Twitter, Facebook } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Shop */}
          <div>
            <h3 className="font-bold text-sm mb-4">Shop</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/shop?category=tops" className="hover:underline text-foreground">
                  Shirt
                </Link>
              </li>
              <li>
                <Link href="/shop?category=outerwear" className="hover:underline text-foreground">
                  Overshirts & Shackets
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:underline text-foreground">
                  Co-ord Sets
                </Link>
              </li>
              <li>
                <Link href="/shop?category=bottoms" className="hover:underline text-foreground">
                  Shorts
                </Link>
              </li>
              <li>
                <Link href="/shop?category=bottoms" className="hover:underline text-foreground">
                  Trousers
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="font-bold text-sm mb-4">Customer Support</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/account" className="hover:underline text-foreground">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/policies/refund" className="hover:underline text-foreground">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/return-exchange" className="hover:underline text-foreground">
                  Return/Exchange
                </Link>
              </li>
              <li>
                <Link href="/policies/shipping" className="hover:underline text-foreground">
                  Shipping Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-bold text-sm mb-4">Help</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/faq" className="hover:underline text-foreground">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline text-foreground">
                  Contact us
                </Link>
              </li>
              <li>
                <Link href="/policies/privacy" className="hover:underline text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/terms" className="hover:underline text-foreground">
                  Terms of Services
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col mb-4 md:mb-0">
              <div className="flex flex-col mb-2">
                <span className="text-lg font-light tracking-widest">MEDHUEA</span>
                <span className="text-lg font-light tracking-widest">STORE</span>
              </div>
              <p className="text-xs text-muted-foreground">© 2025 Medhuea Store. All rights reserved.</p>
            </div>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-accent transition">
                <Instagram size={16} />
              </Link>
              <Link href="#" className="hover:text-accent transition">
                <Twitter size={16} />
              </Link>
              <Link href="#" className="hover:text-accent transition">
                <Facebook size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
