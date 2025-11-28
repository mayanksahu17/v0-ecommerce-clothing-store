"use client"

import { CreditCard } from "lucide-react"

export interface PaymentMethod {
  id: string
  name: string
  logo: string
  color: string
}

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "visa",
    name: "Visa",
    logo: "VI",
    color: "from-blue-600 to-blue-700",
  },
  {
    id: "mastercard",
    name: "Mastercard",
    logo: "MC",
    color: "from-orange-600 to-red-600",
  },
  {
    id: "amex",
    name: "American Express",
    logo: "AX",
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: "discover",
    name: "Discover",
    logo: "DIS",
    color: "from-orange-400 to-yellow-500",
  },
]

interface PaymentMethodSelectorProps {
  selectedMethod: string
  onSelect: (methodId: string) => void
}

export function PaymentMethodSelector({ selectedMethod, onSelect }: PaymentMethodSelectorProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm font-light text-muted-foreground">Accepted Payment Methods</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {PAYMENT_METHODS.map((method) => (
          <button
            key={method.id}
            onClick={() => onSelect(method.id)}
            className={`p-4 border-2 transition-all rounded ${
              selectedMethod === method.id ? "border-foreground bg-secondary" : "border-border hover:border-foreground"
            }`}
            aria-label={`Select ${method.name}`}
          >
            <div
              className={`w-full h-12 bg-gradient-to-br ${method.color} rounded flex items-center justify-center mb-2`}
            >
              <span className="text-white font-bold text-xs tracking-wider">{method.logo}</span>
            </div>
            <p className="text-xs font-light text-center">{method.name}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

interface CardInputDisplayProps {
  cardNumber: string
  cardholderName: string
  expiry: string
  selectedMethod: string
}

export function CardInputDisplay({ cardNumber, cardholderName, expiry, selectedMethod }: CardInputDisplayProps) {
  const method = PAYMENT_METHODS.find((m) => m.id === selectedMethod) || PAYMENT_METHODS[0]
  const maskedCardNumber = cardNumber ? cardNumber.replace(/\d(?=\d{4})/g, "*") : "•••• •••• •••• ••••"
  const displayNumber = maskedCardNumber.replace(/(.{4})/g, "$1 ").trim()

  return (
    <div
      className={`p-6 rounded-lg bg-gradient-to-br ${method.color} text-white relative overflow-hidden h-48 flex flex-col justify-between`}
    >
      {/* Background pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
        <CreditCard size={128} />
      </div>

      {/* Card content */}
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-8">
          <p className="text-xs font-light opacity-75">CARD NUMBER</p>
          <p className="text-sm font-bold">{method.logo}</p>
        </div>

        <p className="font-mono text-lg tracking-widest mb-8">{displayNumber}</p>
      </div>

      <div className="relative z-10 flex justify-between items-end">
        <div>
          <p className="text-xs font-light opacity-75 mb-1">CARDHOLDER</p>
          <p className="text-sm font-light">{cardholderName || "YOUR NAME"}</p>
        </div>
        <div>
          <p className="text-xs font-light opacity-75 mb-1">EXPIRES</p>
          <p className="text-sm font-light">{expiry || "MM/YY"}</p>
        </div>
      </div>
    </div>
  )
}
