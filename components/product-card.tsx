import Link from "next/link"
import { Star } from "lucide-react"

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
  rating: number
  reviews: number
}

export function ProductCard({ id, name, price, image, rating, reviews }: ProductCardProps) {
  return (
    <Link href={`/product/${id}`}>
      <div className="group cursor-pointer">
        <div className="relative bg-secondary overflow-hidden mb-4">
          <img
            src={image || "/placeholder.svg"}
            alt={name}
            className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-light tracking-wide">{name}</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm font-light">${price}</span>
            <div className="flex items-center gap-1">
              <Star size={12} fill="currentColor" />
              <span className="text-xs text-muted-foreground">
                {rating} ({reviews})
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
