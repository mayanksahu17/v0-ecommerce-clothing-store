"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { products, categories, priceRanges, colors } from "@/lib/mock-data"
import { useState, useMemo } from "react"
import { ChevronDown } from "lucide-react"

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedPriceRange, setSelectedPriceRange] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("featured")
  const [expandedFilters, setExpandedFilters] = useState({
    category: true,
    price: true,
    color: false,
  })

  const filteredProducts = useMemo(() => {
    let filtered = products

    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }

    if (selectedColors.length > 0) {
      filtered = filtered.filter((p) => selectedColors.some((color) => p.colors.includes(color)))
    }

    if (selectedPriceRange.length > 0) {
      filtered = filtered.filter((p) => {
        return selectedPriceRange.some((range) => {
          const [minStr, maxStr] = range.split("-")
          const min = Number.parseInt(minStr)
          const max = maxStr ? Number.parseInt(maxStr) : Number.POSITIVE_INFINITY
          return p.price >= min && p.price <= max
        })
      })
    }

    if (sortBy === "price-asc") {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-desc") {
      filtered.sort((a, b) => b.price - a.price)
    } else if (sortBy === "newest") {
      filtered.reverse()
    }

    return filtered
  }, [selectedCategory, selectedColors, selectedPriceRange, sortBy])

  return (
    <main className="bg-background">
      <Header />

      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-light mb-12">Shop</h1>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters */}
            <aside className="lg:col-span-1">
              <div className="space-y-6 sticky top-32">
                {/* Category Filter */}
                <div>
                  <button
                    onClick={() => setExpandedFilters((prev) => ({ ...prev, category: !prev.category }))}
                    className="flex items-center justify-between w-full py-2 text-sm font-light hover:text-accent"
                  >
                    Category
                    <ChevronDown size={16} className={expandedFilters.category ? "rotate-180" : ""} />
                  </button>
                  {expandedFilters.category && (
                    <div className="mt-3 space-y-2">
                      {categories.map((cat) => (
                        <label key={cat.id} className="flex items-center gap-2 text-sm cursor-pointer">
                          <input
                            type="radio"
                            name="category"
                            value={cat.id}
                            checked={selectedCategory === cat.id}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-4 h-4"
                          />
                          <span>{cat.name}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Price Filter */}
                <div>
                  <button
                    onClick={() => setExpandedFilters((prev) => ({ ...prev, price: !prev.price }))}
                    className="flex items-center justify-between w-full py-2 text-sm font-light hover:text-accent"
                  >
                    Price
                    <ChevronDown size={16} className={expandedFilters.price ? "rotate-180" : ""} />
                  </button>
                  {expandedFilters.price && (
                    <div className="mt-3 space-y-2">
                      {priceRanges.map((range) => (
                        <label key={range.id} className="flex items-center gap-2 text-sm cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedPriceRange.includes(`${range.min}-${range.max}`)}
                            onChange={(e) => {
                              const val = `${range.min}-${range.max}`
                              setSelectedPriceRange((prev) =>
                                e.target.checked ? [...prev, val] : prev.filter((r) => r !== val),
                              )
                            }}
                            className="w-4 h-4"
                          />
                          <span>{range.label}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Color Filter */}
                <div>
                  <button
                    onClick={() => setExpandedFilters((prev) => ({ ...prev, color: !prev.color }))}
                    className="flex items-center justify-between w-full py-2 text-sm font-light hover:text-accent"
                  >
                    Color
                    <ChevronDown size={16} className={expandedFilters.color ? "rotate-180" : ""} />
                  </button>
                  {expandedFilters.color && (
                    <div className="mt-3 space-y-2">
                      {colors.map((color) => (
                        <label key={color.id} className="flex items-center gap-2 text-sm cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedColors.includes(color.id)}
                            onChange={(e) => {
                              setSelectedColors((prev) =>
                                e.target.checked ? [...prev, color.id] : prev.filter((c) => c !== color.id),
                              )
                            }}
                            className="w-4 h-4"
                          />
                          <div
                            className="w-4 h-4 rounded-full border border-border"
                            style={{ backgroundColor: color.hex }}
                          />
                          <span>{color.name}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Sort */}
                <div className="pt-4 border-t border-border">
                  <label className="flex flex-col gap-2 text-sm font-light">
                    Sort By
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-input border border-border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
                    >
                      <option value="featured">Featured</option>
                      <option value="newest">Newest</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                    </select>
                  </label>
                </div>
              </div>
            </aside>

            {/* Products */}
            <div className="lg:col-span-3">
              <div className="mb-6 text-sm text-muted-foreground">Showing {filteredProducts.length} products</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => <ProductCard key={product.id} {...product} />)
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground">No products found. Try adjusting your filters.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
