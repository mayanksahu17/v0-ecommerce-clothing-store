"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { products, categories } from "@/lib/mock-data"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Home() {
  const featuredProducts = products.slice(0, 4)
  const newArrivals = products.slice(4, 8)

  return (
    <main className="bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* Background Video */}
        <video
          src="/video.mp4"
          autoPlay
          loop
          muted
          playsInline
          poster="/premium-minimal-fashion-luxury-clothing-brand-look.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          aria-label="Hero video showcasing our fashion collection"
        >
          Your browser does not support the video tag.
        </video>
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto w-full">
            <div className="max-w-2xl space-y-6 text-white">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light leading-tight">
                Minimal fashion for the modern lifestyle
              </h1>
              <p className="text-base lg:text-lg text-white/90 max-w-md">
                Discover curated pieces that blend timeless design with contemporary style. Premium quality, ethical
                production.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black hover:bg-white/90 transition"
              >
                Shop Now
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-light mb-12 text-center">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {categories.slice(1, 4).map((category) => (
              <Link key={category.id} href={`/shop?category=${category.id}`}>
                <div className="bg-card p-8 text-center hover:bg-muted transition cursor-pointer">
                  <h3 className="text-lg font-light tracking-wide">{category.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{category.count} items</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-light">Featured Collection</h2>
            <Link href="/shop" className="text-sm font-light hover:text-accent transition flex items-center gap-2">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-light">Join Our Community</h2>
          <p className="text-muted-foreground">
            Subscribe to receive exclusive offers, styling tips, and new collection launches.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3"
            onSubmit={(e) => {
              e.preventDefault()
            }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
              required
            />
            <button type="submit" className="px-8 py-3 bg-foreground text-background hover:bg-accent transition">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-light mb-12">New Arrivals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
