import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function RefundPolicyPage() {
  return (
    <main className="bg-background">
      <Header />
      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-light mb-8">Refund Policy</h1>
          <div className="prose prose-invert space-y-6 text-sm text-muted-foreground">
            <p>Last updated: November 2025</p>

            <section className="space-y-4">
              <h2 className="text-2xl font-light text-foreground">Returns & Refunds</h2>
              <p>
                At Medhuea Store, we want you to be completely satisfied with your purchase. If you're not entirely
                happy with an item, we offer a 30-day returns policy.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-light text-foreground">Return Conditions</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Items must be returned within 30 days of purchase</li>
                <li>Items must be unused and in original condition</li>
                <li>Original tags must be attached</li>
                <li>Return shipping is at customer's expense</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-light text-foreground">Refund Process</h2>
              <p>
                Once we receive your returned item, we will inspect it and notify you of the status of your refund. If
                approved, the refund will be processed and a credit will be applied to your original payment method
                within 5-10 business days.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-light text-foreground">Non-Returnable Items</h2>
              <p>
                Certain items cannot be returned, including customized or personalized items, and items purchased on
                final sale.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-light text-foreground">Contact Us</h2>
              <p>For questions about returns and refunds, please contact us at hello@medhueastore.com</p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
