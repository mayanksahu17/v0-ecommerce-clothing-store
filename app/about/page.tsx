"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState, useEffect } from "react"
import { Check, X, Loader2 } from "lucide-react"
import Link from "next/link"
import { parsePaymentResponse } from "sabpaisa-pg-dev"
import { useCart } from "@/hooks/use-cart"
import { useSearchParams } from "next/navigation"

export default function AboutPage() {
  const { clearCart } = useCart()
  const searchParams = useSearchParams()
  const [paymentData, setPaymentData] = useState<any>(null)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [showPaymentResult, setShowPaymentResult] = useState(false)

  useEffect(() => {
    const processPaymentResponse = async () => {
      // Check if this is a payment callback (has encResponse parameter)
      const encResponse = searchParams.get('encResponse')
      
      if (encResponse) {
        setIsProcessingPayment(true)
        setShowPaymentResult(true)
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
          setPaymentData({ error: "Failed to process payment response" })
        } finally {
          setIsProcessingPayment(false)
        }
      }
    }

    processPaymentResponse()
  }, [searchParams, clearCart])

  // If processing payment, show payment result
  if (showPaymentResult) {
    const isSuccess = paymentData?.txnStatus === "SUCCESS"
    const isPending = paymentData?.txnStatus === "PENDING"
    const isFailed = paymentData?.txnStatus === "FAILED" || paymentData?.txnStatus === "FAILURE"

    return (
      <main className="bg-background">
        <Header />
        <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto space-y-8">
            {isProcessingPayment ? (
              <div className="text-center space-y-8">
                <div className="flex justify-center">
                  <Loader2 size={48} className="animate-spin text-foreground" />
                </div>
                <h1 className="text-4xl font-light">Processing Payment...</h1>
                <p className="text-muted-foreground">Please wait while we verify your payment.</p>
              </div>
            ) : (
              <>
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
                  <p className="text-muted-foreground mb-8">
                    {isSuccess
                      ? "Your payment has been processed successfully. You will receive an email confirmation shortly."
                      : isPending
                      ? "Your payment is being processed. Please check back later or contact support if you have any questions."
                      : "Your payment could not be processed. Please try again or use a different payment method."}
                  </p>
                </div>

                {paymentData && !paymentData.error && (
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
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {isSuccess ? (
                    <Link
                      href="/"
                      className="inline-block px-8 py-3 bg-foreground text-background hover:bg-accent transition text-center"
                    >
                      Continue Shopping
                    </Link>
                  ) : (
                    <>
                      <Link
                        href="/checkout"
                        className="inline-block px-8 py-3 bg-foreground text-background hover:bg-accent transition text-center"
                      >
                        Try Again
                      </Link>
                      <Link
                        href="/"
                        className="inline-block px-8 py-3 border border-border hover:bg-secondary transition text-center"
                      >
                        Back to Home
                      </Link>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  // Normal about page content
  return (
    <main className="bg-background">
      <Header />

      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          <h1 className="text-4xl font-light">About Medhuea Store</h1>

          <div className="bg-secondary aspect-video overflow-hidden">
            <img src="/urban-thread-co-luxury-fashion-brand-minimal-studi.jpg" alt="About Medhuea Store" className="w-full h-full object-cover" />
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-light">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed">
              Medhuea Store was founded with a vision to create premium fashion that celebrates minimalism and
              quality craftsmanship. We believe that timeless design and sustainable practices go hand in hand, and
              we're committed to offering pieces that transcend trends.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Every garment is thoughtfully designed and ethically produced using sustainable materials. We work
              directly with manufacturers who share our values of fair labor practices and environmental responsibility.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-light">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              To provide contemporary fashion that empowers individuals to express their style through quality, minimal
              design. We're dedicated to creating a more sustainable fashion industry, one piece at a time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-y border-border">
            <div className="text-center space-y-3">
              <h3 className="text-2xl font-light">100%</h3>
              <p className="text-sm text-muted-foreground">Sustainable Materials</p>
            </div>
            <div className="text-center space-y-3">
              <h3 className="text-2xl font-light">Fair</h3>
              <p className="text-sm text-muted-foreground">Labor Practices</p>
            </div>
            <div className="text-center space-y-3">
              <h3 className="text-2xl font-light">∞</h3>
              <p className="text-sm text-muted-foreground">Timeless Design</p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-light">Contact Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-light mb-2">Email</h3>
                <a href="mailto:Prabhash7049@gmail.com" className="text-sm hover:text-accent transition">
                  Prabhash7049@gmail.com
                </a>
              </div>
              <div>
                <h3 className="font-light mb-2">Phone</h3>
                <a href="tel:+917049407951" className="text-sm hover:text-accent transition">
                  +91 7049407951
                </a>
              </div>
              <div>
                <h3 className="font-light mb-2">Address</h3>
                <p className="text-sm text-muted-foreground">
                  353 MR3 Road, Mahalakshmi Nagar<br />
                  Indore - 452010
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Medhuea Store is owned by <strong className="text-foreground">NineXFold agency llp</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
