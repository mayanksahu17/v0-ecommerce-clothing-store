import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function FAQPage() {
  return (
    <main className="bg-background">
      <Header />
      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-light mb-8">Frequently Asked Questions</h1>
          <div className="space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-light">Shipping & Delivery</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-light mb-2">How long does shipping take?</h3>
                  <p className="text-sm text-muted-foreground">
                    Standard shipping typically takes 5-7 business days. Express shipping (2-3 business days) and
                    overnight shipping (1 business day) are also available.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-light mb-2">Do you ship internationally?</h3>
                  <p className="text-sm text-muted-foreground">
                    Yes, we ship to select countries. International orders may be subject to customs duties and taxes.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-light mb-2">Is free shipping available?</h3>
                  <p className="text-sm text-muted-foreground">
                    Standard shipping is complimentary for orders over ₹2500. Orders under ₹2500 will incur a ₹100 shipping
                    fee.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-light">Returns & Exchanges</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-light mb-2">What is your return policy?</h3>
                  <p className="text-sm text-muted-foreground">
                    We offer a 30-day returns policy. Items must be unused, in original condition, and with original tags
                    attached. Return shipping is at customer's expense.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-light mb-2">How do I return an item?</h3>
                  <p className="text-sm text-muted-foreground">
                    Please contact us at hello@medhueastore.com to initiate a return. We'll provide you with return
                    instructions and a return authorization number.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-light mb-2">How long until I receive my refund?</h3>
                  <p className="text-sm text-muted-foreground">
                    Once we receive your returned item, we will inspect it and process your refund within 5-10 business
                    days.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-light">Products & Sizing</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-light mb-2">Do you offer size guides?</h3>
                  <p className="text-sm text-muted-foreground">
                    Yes, size guides are available on individual product pages. Please refer to the sizing information
                    before making a purchase.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-light mb-2">What if an item doesn't fit?</h3>
                  <p className="text-sm text-muted-foreground">
                    You can return or exchange items that don't fit within 30 days of purchase, as long as they are
                    unused and in original condition.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-light mb-2">Are products available in multiple colors?</h3>
                  <p className="text-sm text-muted-foreground">
                    Yes, many of our products are available in multiple colors. Available color options are listed on each
                    product page.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-light">Payment & Orders</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-light mb-2">What payment methods do you accept?</h3>
                  <p className="text-sm text-muted-foreground">
                    We accept all major credit cards, debit cards, and other secure payment methods through our checkout
                    process.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-light mb-2">Can I modify or cancel my order?</h3>
                  <p className="text-sm text-muted-foreground">
                    Please contact us immediately at hello@medhueastore.com if you need to modify or cancel your order.
                    Once an order has been processed and shipped, it cannot be cancelled.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-light mb-2">Will I receive an order confirmation?</h3>
                  <p className="text-sm text-muted-foreground">
                    Yes, you will receive an email confirmation with your order details and tracking information once your
                    order has been placed and shipped.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-4 pt-8 border-t border-border">
              <h2 className="text-2xl font-light">Still have questions?</h2>
              <p className="text-sm text-muted-foreground">
                If you have any other questions, please don't hesitate to{" "}
                <a href="/contact" className="underline hover:text-accent">
                  contact us
                </a>
                . We're here to help!
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

