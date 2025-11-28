export interface Product {
  id: string
  name: string
  price: number
  category: string
  colors: string[]
  sizes: string[]
  image: string
  images: string[]
  description: string
  rating: number
  reviews: number
}

export interface CartItem {
  productId: string
  quantity: number
  size: string
  color: string
}

export interface Cart {
  items: CartItem[]
  total: number
}
