"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { products as mockProducts } from "@/lib/mock-data"
import { useCart } from "@/hooks/use-cart"
import { useState, useEffect, useRef } from "react"
import { Star, Heart, Share2 } from "lucide-react"
import { useParams } from "next/navigation"
import type { Product } from "@/lib/types"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function ProductPage() {
  const params = useParams()
  const productId = params.id as string
  const { addToCart } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)
  const detailsRef = useRef<HTMLDivElement>(null)
  const relatedRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchProduct()
    fetchAllProducts()
  }, [productId])

  const fetchProduct = async () => {
    if (!productId) {
      setLoading(false)
      return
    }
    
    try {
      const response = await fetch(`/api/products/${productId}`)
      const data = await response.json()
      
      if (response.ok && data && !data.error) {
        setProduct(data)
        setSelectedColor(data.colors?.[0] || "")
      } else {
        // Fallback to mock data
        console.log('API returned error, trying mock data for id:', productId)
        const mockProduct = mockProducts.find((p) => p.id === productId)
        if (mockProduct) {
          setProduct(mockProduct)
          setSelectedColor(mockProduct.colors[0] || "")
        } else {
          console.error('Product not found in API or mock data:', productId)
        }
      }
    } catch (error) {
      console.error('Error fetching product:', error)
      // Fallback to mock data
      const mockProduct = mockProducts.find((p) => p.id === productId)
      if (mockProduct) {
        setProduct(mockProduct)
        setSelectedColor(mockProduct.colors[0] || "")
      }
    } finally {
      setLoading(false)
    }
  }

  const fetchAllProducts = async () => {
    try {
      const response = await fetch('/api/products')
      if (response.ok) {
        const data = await response.json()
        setAllProducts(data)
      } else {
        setAllProducts(mockProducts)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      setAllProducts(mockProducts)
    }
  }

  if (loading) {
    return (
      <main className="bg-background">
        <Header />
        <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-muted-foreground">Loading product...</p>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  if (!product) {
    return (
      <main className="bg-background">
        <Header />
        <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-muted-foreground">Product not found</p>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size")
      return
    }
    addToCart(product.id, quantity, selectedSize, selectedColor, product.price)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  const relatedProducts = allProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  useEffect(() => {
    if (!loading && product && imageRef.current && detailsRef.current) {
      const tl = gsap.timeline()
      
      tl.from(imageRef.current, {
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: "power3.out"
      })
      .from(detailsRef.current.children, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.4")
    }
  }, [loading, product])

  useEffect(() => {
    if (relatedRef.current && relatedProducts.length > 0) {
      gsap.from(relatedRef.current.children, {
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: relatedRef.current,
          start: "top 80%",
        }
      })
    }
  }, [relatedProducts])

  return (
    <main className="bg-background">
      <Header />

      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Product */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
            {/* Images */}
            <div ref={imageRef} className="space-y-4">
              <div className="bg-secondary aspect-square overflow-hidden">
                <img
                  src={product.images && product.images.length > 0 ? (product.images[selectedImage] || product.image) : (product.image || "/placeholder.svg")}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.images && product.images.length > 0 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`bg-secondary aspect-square overflow-hidden border ${
                        selectedImage === idx ? "border-foreground" : "border-border"
                      }`}
                    >
                      <img src={img || product.image || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div ref={detailsRef} className="space-y-8">
              <div>
                <h1 className="text-4xl font-light mb-4">{product.name}</h1>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-2xl font-light">₹{product.price}</span>
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
                  </div>
                </div>
                <p className="text-muted-foreground">{product.description}</p>
              </div>

              {/* Color Selection */}
              <div>
                <h3 className="text-sm font-light mb-3 tracking-wide">COLOR</h3>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 transition ${
                        selectedColor === color ? "border-foreground" : "border-border"
                      }`}
                      title={color}
                      style={{
                        backgroundColor: color === "white" ? "#FFFFFF" : color === "black" ? "#000000" : undefined,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="text-sm font-light mb-3 tracking-wide">SIZE</h3>
                <div className="grid grid-cols-4 gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 px-2 border text-sm font-light transition ${
                        selectedSize === size
                          ? "border-foreground bg-foreground text-background"
                          : "border-border hover:border-foreground"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <h3 className="text-sm font-light mb-3 tracking-wide">QUANTITY</h3>
                <div className="flex items-center gap-4 border border-border w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 font-light hover:bg-secondary transition"
                  >
                    −
                  </button>
                  <span className="font-light">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 font-light hover:bg-secondary transition"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className={`w-full py-4 text-sm font-light tracking-wide transition ${
                  isAdded ? "bg-foreground text-background" : "bg-foreground text-background hover:bg-accent"
                }`}
              >
                {isAdded ? "✓ Added to Cart" : "Add to Cart"}
              </button>

              {/* Share */}
              <div className="flex gap-4 border-t border-b border-border py-4">
                <button className="flex items-center gap-2 text-sm font-light hover:text-accent transition">
                  <Heart size={16} />
                  Add to Wishlist
                </button>
                <button className="flex items-center gap-2 text-sm font-light hover:text-accent transition">
                  <Share2 size={16} />
                  Share
                </button>
              </div>

              <div className="text-xs text-muted-foreground space-y-2">
                <p>✓ Free shipping on orders over ₹2500</p>
                <p>✓ 30-day returns</p>
                <p>✓ Sustainably sourced materials</p>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="border-t border-border pt-24">
              <h2 className="text-3xl font-light mb-12">You Might Also Like</h2>
              <div ref={relatedRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map((prod) => (
                  <ProductCard key={prod.id} {...prod} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
