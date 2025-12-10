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
              <h2 className="text-2xl font-light text-foreground">Refund Policy – Medhuea Store</h2>
              <p>
                At Medhuea Store, we strive to ensure you are completely satisfied with your purchase. If you are not satisfied, we are here to help.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-light text-foreground">Returns</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Items can be returned within 14 days of delivery.</li>
                <li>Items must be unused, unworn, and in original packaging with tags intact.</li>
                <li>If return is accepted, refund product will be delivered within 7-10 business days.</li>
                <li>Our Return & Refund Policy allows returns within 3–7 days, and all approved refunds are processed via bank transfer.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-light text-foreground">Refunds</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Refunds will be credited to the original payment method within 7-10 business days after we receive the returned item.</li>
                <li>Shipping charges are non-refundable, unless the return is due to a defective or incorrect product.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-light text-foreground">Exchanges</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Exchanges are subject to product availability.</li>
                <li>If you wish to exchange an item, please contact us at{" "}
                  <a href="mailto:hello@medhueastore.com" className="underline hover:text-accent">
                    hello@medhueastore.com
                  </a>
                  .
                </li>
                <li>If exchange is accepted by us, exchanged product will be delivered within 7-10 business days.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-light text-foreground">Replacement</h2>
              <p>If replacement is accepted by us, replaced product will be delivered within 7-10 business days.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-light text-foreground">Non-Returnable Items</h2>
              <p>Sale or discounted items, gift cards, and intimate apparel may not be eligible for returns.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-light text-foreground">How to Return</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>
                  Contact us via email at{" "}
                  <a href="mailto:hello@medhueastore.com" className="underline hover:text-accent">
                    hello@medhueastore.com
                  </a>{" "}
                  to initiate a return.
                </li>
                <li>Pack the item securely and ship it to the provided address.</li>
              </ol>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-light text-foreground">Contact Us</h2>
              <p>
                For questions about returns and refunds, please contact us at{" "}
                <a href="mailto:hello@medhueastore.com" className="underline hover:text-accent">
                  hello@medhueastore.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
