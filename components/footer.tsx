import Link from "next/link"
import { Instagram, Twitter, Facebook } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex flex-col mb-4">
              <span className="text-lg font-light tracking-widest">URBAN</span>
              <span className="text-lg font-light tracking-widest">THREAD</span>
            </div>
            <p className="text-xs text-muted-foreground">Premium minimal fashion for modern lifestyles.</p>
          </div>

          {/* Menu */}
          <div>
            <h3 className="font-light text-sm mb-4 tracking-wide">MENU</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:underline">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="font-light text-sm mb-4 tracking-wide">POLICIES</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/policies/privacy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/refund" className="hover:underline">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/terms" className="hover:underline">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/policies/shipping" className="hover:underline">
                  Shipping Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Support */}
          <div>
            <h3 className="font-light text-sm mb-4 tracking-wide">RESOURCES</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/support" className="hover:underline">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/newsletter" className="hover:underline">
                  Newsletter
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="hover:underline">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:underline">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">© 2025 Urban Thread Co. All rights reserved.</p>
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
