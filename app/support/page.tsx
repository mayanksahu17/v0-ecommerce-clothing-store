import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { MessageSquare, Headphones, FileText, Truck } from "lucide-react"

export default function SupportPage() {
  return (
    <main className="bg-background">
      <Header />

      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-light mb-6">Customer Support</h1>
          <p className="text-muted-foreground mb-12">
            We're here to help. Choose from the options below to get the support you need.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Link href="/contact">
              <div className="bg-secondary p-8 space-y-4 hover:bg-muted transition cursor-pointer h-full">
                <MessageSquare size={32} className="text-foreground" />
                <h3 className="text-lg font-light">Send Us a Message</h3>
                <p className="text-sm text-muted-foreground">
                  Have a question? Send us a message and we'll get back to you within 24 hours.
                </p>
              </div>
            </Link>

            <div className="bg-secondary p-8 space-y-4">
              <Headphones size={32} className="text-foreground" />
              <h3 className="text-lg font-light">Call Us</h3>
              <p className="text-sm text-muted-foreground">
                Prefer to speak with someone? Call us at{" "}
                <a href="tel:+1234567890" className="hover:text-accent transition">
                  +1 (234) 567-890
                </a>
              </p>
              <p className="text-xs text-muted-foreground">Mon - Fri: 9AM - 6PM EST</p>
            </div>

            <Link href="/policies/shipping">
              <div className="bg-secondary p-8 space-y-4 hover:bg-muted transition cursor-pointer h-full">
                <Truck size={32} className="text-foreground" />
                <h3 className="text-lg font-light">Shipping Information</h3>
                <p className="text-sm text-muted-foreground">
                  Learn about our shipping options, rates, and delivery times.
                </p>
              </div>
            </Link>

            <div className="bg-secondary p-8 space-y-4">
              <FileText size={32} className="text-foreground" />
              <h3 className="text-lg font-light">Frequently Asked Questions</h3>
              <p className="text-sm text-muted-foreground">
                Find answers to common questions about our products and services.
              </p>
            </div>
          </div>

          <div className="bg-secondary p-12 space-y-6">
            <h2 className="text-2xl font-light">FAQ</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-light mb-2">How do I track my order?</h3>
                <p className="text-sm text-muted-foreground">
                  You'll receive an email with tracking information once your order has been shipped. You can also check
                  your account for order status.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-light mb-2">What is your return policy?</h3>
                <p className="text-sm text-muted-foreground">
                  We offer a 30-day return policy for unused items in original condition. Visit our{" "}
                  <Link href="/policies/refund" className="hover:text-accent transition">
                    refund policy
                  </Link>{" "}
                  for more details.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-light mb-2">Do you offer international shipping?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes, we ship to select countries. International orders may be subject to customs duties and taxes. See
                  our{" "}
                  <Link href="/policies/shipping" className="hover:text-accent transition">
                    shipping policy
                  </Link>{" "}
                  for more information.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-light mb-2">How can I contact customer service?</h3>
                <p className="text-sm text-muted-foreground">
                  You can reach us via email at hello@urbanthread.co or call +1 (234) 567-890. We're available Mon -
                  Fri, 9AM - 6PM EST.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
