import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ShippingPolicyPage() {
  return (
    <main className="bg-background">
      <Header />
      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-light mb-8">Shipping Policy</h1>
          <div className="prose prose-invert space-y-6 text-sm text-muted-foreground">
            <p>Last updated: November 2025</p>

            <section className="space-y-4">
              <h2 className="text-2xl font-light text-foreground">Shipping Options</h2>
              <p>We offer several shipping options to meet your needs:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Standard Shipping (5-7 business days) - FREE on orders over ₹2500</li>
                <li>Express Shipping (2-3 business days) - ₹150</li>
                <li>Overnight Shipping (1 business day) - ₹250</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-light text-foreground">Shipping Rates</h2>
              <p>
                Standard shipping is complimentary for orders over ₹2500. Orders under ₹2500 will incur a ₹100 shipping fee
                unless otherwise specified.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-light text-foreground">Processing Time</h2>
              <p>
                Orders are typically processed within 1-2 business days. Orders placed on weekends or holidays will be
                processed the following business day.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-light text-foreground">Tracking</h2>
              <p>
                All orders include tracking information. You will receive an email with tracking details once your order
                has been shipped.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-light text-foreground">International Shipping</h2>
              <p>
                We currently ship to select countries. International orders may be subject to customs duties and taxes.
                Please check with your local customs authority for details.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-light text-foreground">Contact Us</h2>
              <p>For shipping inquiries, please contact us at hello@medhueastore.com</p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
