"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useCart } from "@/hooks/use-cart"
import { products } from "@/lib/mock-data"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Check } from "lucide-react"
import { PaymentMethodSelector, CardInputDisplay } from "@/components/payment-methods"

export default function CheckoutPage() {
  const { cart, clearCart } = useCart()
  const [cartTotal, setCartTotal] = useState(0)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("visa")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    cardNumber: "",
    cardholderName: "",
    expiry: "",
    cvc: "",
  })

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    if (name === "cardNumber") {
      const cleaned = value.replace(/\s+/g, "")
      const formatted = cleaned.replace(/(\d{4})/g, "$1 ").trim()
      setFormData((prev) => ({ ...prev, [name]: formatted }))
    } else if (name === "expiry") {
      const cleaned = value.replace(/\D/g, "")
      if (cleaned.length >= 2) {
        const formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`
        setFormData((prev) => ({ ...prev, [name]: formatted }))
      } else {
        setFormData((prev) => ({ ...prev, [name]: cleaned }))
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setOrderPlaced(true)
    clearCart()
  }

  if (orderPlaced) {
    return (
      <main className="bg-background">
        <Header />
        <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-foreground rounded-full flex items-center justify-center">
                <Check size={32} className="text-background" />
              </div>
            </div>
            <h1 className="text-4xl font-light">Order Confirmed!</h1>
            <p className="text-muted-foreground">
              Thank you for your purchase. You will receive an email confirmation shortly with your order details and
              tracking information.
            </p>
            <div className="bg-secondary p-8 space-y-4 text-left">
              <h2 className="text-lg font-light">Order Details</h2>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  Name: {formData.firstName} {formData.lastName}
                </p>
                <p>Email: {formData.email}</p>
                <p>Items: {cart.items.length}</p>
                <p>Total: ₹{cartTotal.toFixed(2)}</p>
                <p>Payment: {selectedPaymentMethod.toUpperCase()}</p>
              </div>
            </div>
            <Link href="/" className="inline-block px-8 py-3 bg-foreground text-background hover:bg-accent transition">
              Back to Home
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="bg-background">
      <Header />

      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-light mb-12">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Shipping Information */}
                <div className="space-y-6 pb-8 border-b border-border">
                  <h2 className="text-xl font-light">Shipping Information</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="col-span-1 px-4 py-3 bg-input border border-border text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="col-span-1 px-4 py-3 bg-input border border-border text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
                    />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-input border border-border text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-input border border-border text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Street Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-input border border-border text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="col-span-1 px-4 py-3 bg-input border border-border text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
                    />
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="col-span-1 px-4 py-3 bg-input border border-border text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="zip"
                      placeholder="ZIP Code"
                      value={formData.zip}
                      onChange={handleInputChange}
                      required
                      className="col-span-1 px-4 py-3 bg-input border border-border text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
                    />
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      className="col-span-1 px-4 py-3 bg-input border border-border text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
                    >
                      <option value="">Select Country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                    </select>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="space-y-6 pb-8 border-b border-border">
                  <h2 className="text-xl font-light">Payment Information</h2>

                  <PaymentMethodSelector selectedMethod={selectedPaymentMethod} onSelect={setSelectedPaymentMethod} />

                  <div className="mt-6">
                    <CardInputDisplay
                      cardNumber={formData.cardNumber}
                      cardholderName={formData.cardholderName}
                      expiry={formData.expiry}
                      selectedMethod={selectedPaymentMethod}
                    />
                  </div>

                  <div className="space-y-4 mt-6">
                    <input
                      type="text"
                      name="cardholderName"
                      placeholder="Cardholder Name"
                      value={formData.cardholderName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-input border border-border text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
                    />
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      maxLength={19}
                      required
                      className="w-full px-4 py-3 bg-input border border-border text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="expiry"
                        placeholder="MM/YY"
                        value={formData.expiry}
                        onChange={handleInputChange}
                        maxLength={5}
                        required
                        className="col-span-1 px-4 py-3 bg-input border border-border text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
                      />
                      <input
                        type="text"
                        name="cvc"
                        placeholder="CVC"
                        value={formData.cvc}
                        onChange={handleInputChange}
                        maxLength={4}
                        required
                        className="col-span-1 px-4 py-3 bg-input border border-border text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-foreground text-background hover:bg-accent transition font-light tracking-wide"
                >
                  Place Order
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-secondary p-8 sticky top-32 space-y-6">
                <h2 className="text-xl font-light">Order Summary</h2>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {cart.items.map((item) => {
                    const product = products.find((p) => p.id === item.productId)
                    if (!product) return null
                    return (
                      <div
                        key={`${item.productId}-${item.size}-${item.color}`}
                        className="flex justify-between text-sm pb-4 border-b border-border"
                      >
                        <div>
                          <p className="font-light">{product.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-light text-right">₹{(product.price * item.quantity).toFixed(2)}</p>
                      </div>
                    )
                  })}
                </div>
                <div className="space-y-3 border-t border-border pt-4">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₹{cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>₹0.00</span>
                  </div>
                  <div className="flex justify-between font-light text-lg pt-3 border-t border-border">
                    <span>Total</span>
                    <span>₹{cartTotal.toFixed(2)}</span>
                  </div>
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
