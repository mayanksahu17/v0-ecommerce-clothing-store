"use client"

export interface PaymentMethod {
  id: string
  name: string
  logo: string
  color: string
}

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "sabpaisa",
    name: "SabPaisa",
    logo: "https://sabpaisa.in/wp-content/uploads/2023/06/logo.png",
    color: "from-purple-600 to-indigo-600",
  },
]

interface PaymentMethodSelectorProps {
  selectedMethod: string
  onSelect: (methodId: string) => void
}

export function PaymentMethodSelector({ selectedMethod, onSelect }: PaymentMethodSelectorProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm font-light text-muted-foreground">Payment Method</p>
      <div className="flex justify-center">
          <button
          onClick={() => onSelect("sabpaisa")}
          className={`p-6 border-2 transition-all rounded-lg w-full max-w-md ${
            selectedMethod === "sabpaisa" ? "border-foreground bg-secondary" : "border-border hover:border-foreground"
            }`}
          aria-label="Select SabPaisa"
          >
          <div className="w-full h-20 bg-blue-600 rounded flex items-center justify-center mb-3">
            <img
              src="https://sabpaisa.in/wp-content/uploads/2023/06/logo.png"
              alt="SabPaisa"
              className="h-12 object-contain"
            />
            </div>
          <p className="text-sm font-light text-center">SabPaisa Secure Payment</p>
          </button>
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
  // This component is not used for SabPaisa, but kept for compatibility
  return null
}
