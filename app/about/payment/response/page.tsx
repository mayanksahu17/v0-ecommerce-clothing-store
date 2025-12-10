"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState, useEffect } from "react"
import { Check, X, Loader2 } from "lucide-react"
import Link from "next/link"
import { parsePaymentResponse } from "sabpaisa-pg-dev"
import { useCart } from "@/hooks/use-cart"

export default function PaymentResponsePage() {
  const { clearCart } = useCart()
  const [loading, setLoading] = useState(true)
  const [paymentData, setPaymentData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const processPaymentResponse = async () => {
      try {
        const authKey = process.env.NEXT_PUBLIC_SABPAISA_AUTH_KEY || "SAUWc4kFIy7mTMdUay5iL91vFDYZLvGW91nPJSLMmqg="
        const authIV = process.env.NEXT_PUBLIC_SABPAISA_AUTH_IV || "VFqeaLPIO0x3TnnE6rDLFqAtrNzVPtgivohLVI90VRWYIKi8834zyey5SIRMz8gc"

        const data = await parsePaymentResponse(authKey, authIV)
        setPaymentData(data)

        // If payment is successful, clear the cart
        if (data && data.txnStatus === "SUCCESS") {
          clearCart()
        }
      } catch (err) {
        console.error("Error parsing payment response:", err)
        setError("Failed to process payment response")
      } finally {
        setLoading(false)
      }
    }

    processPaymentResponse()
  }, [clearCart])

  if (loading) {
    return (
      <main className="bg-background">
        <Header />
        <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="flex justify-center">
              <Loader2 size={48} className="animate-spin text-foreground" />
            </div>
            <h1 className="text-4xl font-light">Processing Payment...</h1>
            <p className="text-muted-foreground">Please wait while we verify your payment.</p>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  if (error) {
    return (
      <main className="bg-background">
        <Header />
        <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
                <X size={32} className="text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-light">Payment Error</h1>
            <p className="text-muted-foreground">{error}</p>
            <Link href="/about/checkout" className="inline-block px-8 py-3 bg-foreground text-background hover:bg-accent transition">
              Return to Checkout
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  const isSuccess = paymentData?.txnStatus === "SUCCESS"
  const isPending = paymentData?.txnStatus === "PENDING"
  const isFailed = paymentData?.txnStatus === "FAILED" || paymentData?.txnStatus === "FAILURE"

  return (
    <main className="bg-background">
      <Header />
      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Status Icon */}
          <div className="text-center">
            <div className="flex justify-center mb-6">
              {isSuccess ? (
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                  <Check size={32} className="text-white" />
                </div>
              ) : isPending ? (
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Loader2 size={32} className="text-white animate-spin" />
                </div>
              ) : (
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
                  <X size={32} className="text-white" />
                </div>
              )}
            </div>
            <h1 className="text-4xl font-light mb-4">
              {isSuccess ? "Payment Successful!" : isPending ? "Payment Pending" : "Payment Failed"}
            </h1>
            <p className="text-muted-foreground">
              {isSuccess
                ? "Your payment has been processed successfully. You will receive an email confirmation shortly."
                : isPending
                ? "Your payment is being processed. Please check back later or contact support if you have any questions."
                : "Your payment could not be processed. Please try again or use a different payment method."}
            </p>
          </div>

          {/* Payment Details */}
          {paymentData && (
            <div className="bg-secondary p-8 space-y-4">
              <h2 className="text-xl font-light mb-4">Payment Details</h2>
              <div className="space-y-3 text-sm">
                {paymentData.clientTxnId && (
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">Transaction ID:</span>
                    <span className="font-light">{paymentData.clientTxnId}</span>
                  </div>
                )}
                {paymentData.sabpaisaTxnId && (
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">SabPaisa Transaction ID:</span>
                    <span className="font-light">{paymentData.sabpaisaTxnId}</span>
                  </div>
                )}
                {paymentData.amount && (
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">Amount:</span>
                    <span className="font-light">₹{paymentData.amount}</span>
                  </div>
                )}
                {paymentData.txnStatus && (
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">Status:</span>
                    <span
                      className={`font-light ${
                        isSuccess ? "text-green-500" : isPending ? "text-yellow-500" : "text-red-500"
                      }`}
                    >
                      {paymentData.txnStatus}
                    </span>
                  </div>
                )}
                {paymentData.payerName && (
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">Payer Name:</span>
                    <span className="font-light">{paymentData.payerName}</span>
                  </div>
                )}
                {paymentData.payerEmail && (
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-light">{paymentData.payerEmail}</span>
                  </div>
                )}
                {paymentData.payerMobile && (
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">Mobile:</span>
                    <span className="font-light">{paymentData.payerMobile}</span>
                  </div>
                )}
                {paymentData.paymentMode && (
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">Payment Mode:</span>
                    <span className="font-light">{paymentData.paymentMode}</span>
                  </div>
                )}
                {paymentData.message && (
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">Message:</span>
                    <span className="font-light">{paymentData.message}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isSuccess ? (
              <Link
                href="/about"
                className="inline-block px-8 py-3 bg-foreground text-background hover:bg-accent transition text-center"
              >
                Continue Shopping
              </Link>
            ) : (
              <>
                <Link
                  href="/about/checkout"
                  className="inline-block px-8 py-3 bg-foreground text-background hover:bg-accent transition text-center"
                >
                  Try Again
                </Link>
                <Link
                  href="/about"
                  className="inline-block px-8 py-3 border border-border hover:bg-secondary transition text-center"
                >
                  Back to Home
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

