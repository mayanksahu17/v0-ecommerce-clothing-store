"use client"

import { useState, useEffect } from "react"
import type { Cart } from "@/lib/types"

export function useCart() {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0 })
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem("cart", JSON.stringify(cart))
    }
  }, [cart, hydrated])

  const addToCart = (productId: string, quantity: number, size: string, color: string, price: number) => {
    setCart((prev) => {
      const existingItem = prev.items.find(
        (item) => item.productId === productId && item.size === size && item.color === color,
      )

      let newItems
      if (existingItem) {
        newItems = prev.items.map((item) =>
          item.productId === productId && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        )
      } else {
        newItems = [...prev.items, { productId, quantity, size, color }]
      }

      return {
        items: newItems,
        total: cart.total + price * quantity,
      }
    })
  }

  const removeFromCart = (productId: string, size: string, color: string) => {
    setCart((prev) => {
      const item = prev.items.find((item) => item.productId === productId && item.size === size && item.color === color)
      const newItems = prev.items.filter(
        (item) => !(item.productId === productId && item.size === size && item.color === color),
      )
      return {
        items: newItems,
        total: Math.max(0, prev.total - (item?.quantity || 0) * 1),
      }
    })
  }

  const updateQuantity = (productId: string, size: string, color: string, quantity: number) => {
    setCart((prev) => {
      const newItems = prev.items.map((item) =>
        item.productId === productId && item.size === size && item.color === color ? { ...item, quantity } : item,
      )
      return {
        items: newItems,
        total: prev.total,
      }
    })
  }

  const clearCart = () => {
    setCart({ items: [], total: 0 })
  }

  return { cart, addToCart, removeFromCart, updateQuantity, clearCart, hydrated }
}
