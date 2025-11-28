"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useCart } from "@/hooks/use-cart"
import { products } from "@/lib/mock-data"
import { Trash2 } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { PAYMENT_METHODS } from "@/components/payment-methods"

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, hydrated } = useCart()
  const [cartTotal, setCartTotal] = useState(0)

  useEffect(() => {
    let total = 0
    cart.items.forEach((item) => {
      const product = products.find((p) => p.id === item.productId)
      if (product) {
        total += product.price * item.quantity
      }
    })
    setCartTotal(total)
  }, [cart])

  if (!hydrated) {
    return (
      <main className="bg-background">
        <Header />
        <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">Loading...</div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="bg-background">
      <Header />

      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-light mb-12">Shopping Cart</h1>

          {cart.items.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-muted-foreground mb-6">Your cart is empty</p>
              <Link
                href="/shop"
                className="inline-block px-8 py-3 bg-foreground text-background hover:bg-accent transition"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                {cart.items.map((item) => {
                  const product = products.find((p) => p.id === item.productId)
                  if (!product) return null

                  return (
                    <div
                      key={`${item.productId}-${item.size}-${item.color}`}
                      className="flex gap-6 border-b border-border pb-6"
                    >
                      <div className="w-32 h-40 bg-secondary flex-shrink-0 overflow-hidden">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-3">
                        <h3 className="font-light text-lg">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Size: {item.size} | Color: {item.color}
                        </p>
                        <p className="font-light">${product.price}</p>
                        <div className="flex items-center gap-4 pt-2">
                          <div className="flex items-center gap-3 border border-border w-fit">
                            <button
                              onClick={() =>
                                updateQuantity(item.productId, item.size, item.color, Math.max(1, item.quantity - 1))
                              }
                              className="px-3 py-2 font-light hover:bg-secondary transition"
                            >
                              −
                            </button>
                            <span className="font-light">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                              className="px-3 py-2 font-light hover:bg-secondary transition"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.productId, item.size, item.color)}
                            className="text-sm hover:text-accent transition flex items-center gap-2"
                          >
                            <Trash2 size={16} />
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-light">${(product.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-secondary p-8 space-y-6 sticky top-32">
                  <h2 className="text-xl font-light">Order Summary</h2>
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>$0.00</span>
                    </div>
                    <div className="flex justify-between border-t border-border pt-4">
                      <span className="font-light">Total</span>
                      <span className="font-light">${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Accepted Payment Methods */}
                  <div className="pt-4 border-t border-border space-y-3">
                    <p className="text-xs font-light text-muted-foreground uppercase tracking-wide">We Accept</p>
                    <div className="flex flex-wrap gap-2">
                      {PAYMENT_METHODS.map((method) => (
                        <div
                          key={method.id}
                          className={`px-3 py-2 rounded bg-gradient-to-br ${method.color} text-white text-xs font-bold flex items-center justify-center min-w-[50px]`}
                        >
                          {method.logo}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="/checkout"
                    className="block w-full py-3 bg-foreground text-background text-center hover:bg-accent transition font-light"
                  >
                    Proceed to Checkout
                  </Link>
                  <Link
                    href="/shop"
                    className="block w-full py-3 border border-border text-center hover:bg-secondary transition font-light"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
