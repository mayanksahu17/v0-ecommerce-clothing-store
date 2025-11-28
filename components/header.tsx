"use client"

import Link from "next/link"
import { useState } from "react"
import { ShoppingCart, Search, Menu, X } from "lucide-react"
import { useCart } from "@/hooks/use-cart"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { cart } = useCart()
  const cartCount = cart.items.length

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-light tracking-widest">MEDHUEA</span>
              <span className="text-lg sm:text-xl font-light tracking-widest">STORE</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-light hover:text-accent transition">
              Home
            </Link>
            <Link href="/shop" className="text-sm font-light hover:text-accent transition">
              Shop
            </Link>
            <Link href="/about" className="text-sm font-light hover:text-accent transition">
              About Us
            </Link>
            <Link href="/contact" className="text-sm font-light hover:text-accent transition">
              Contact Us
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:text-accent transition">
              <Search size={20} />
            </button>
            <Link href="/cart" className="relative p-2 hover:text-accent transition">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-foreground text-background text-xs flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:text-accent transition"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-border py-4 space-y-4">
            <Link href="/" className="block text-sm font-light hover:text-accent transition">
              Home
            </Link>
            <Link href="/shop" className="block text-sm font-light hover:text-accent transition">
              Shop
            </Link>
            <Link href="/about" className="block text-sm font-light hover:text-accent transition">
              About Us
            </Link>
            <Link href="/contact" className="block text-sm font-light hover:text-accent transition">
              Contact Us
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
