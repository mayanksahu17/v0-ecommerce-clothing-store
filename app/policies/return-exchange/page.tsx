import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ReturnExchangePage() {
  return (
    <main className="bg-background">
      <Header />
      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-light mb-8">Return/Exchange Policy</h1>
          <div className="prose prose-invert space-y-6 text-sm text-muted-foreground">
            <p>Last updated: November 2025</p>

            <section className="space-y-4">
              <h2 className="text-2xl font-light text-foreground">Returns & Exchanges</h2>
              <p>
                At Medhuea Store, we want you to be completely satisfied with your purchase. We offer both returns and
                exchanges for items that don't meet your expectations.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-light text-foreground">Return Policy</h2>
              <p>Items can be returned within 14 days of delivery.</p>
              <h3 className="text-lg font-light text-foreground mt-4">Return Conditions:</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Items must be unused, unworn, and in original packaging with tags intact</li>
                <li>Items can be returned within 3-7 days as per our Return & Refund Policy</li>
                <li>All approved refunds are processed via bank transfer</li>
                <li>Return shipping is at customer's expense</li>
                <li>Items must not show signs of wear or damage</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-light text-foreground">Exchange Policy</h2>
              <p>
                Exchanges are subject to product availability. If you'd like to exchange an item for a different size or color, we're happy to help.
              </p>
              <h3 className="text-lg font-light text-foreground mt-4">Exchange Process:</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>
                  Contact us at{" "}
                  <a href="mailto:hello@medhueastore.com" className="underline hover:text-accent">
                    hello@medhueastore.com
                  </a>{" "}
                  to initiate an exchange
                </li>
                <li>We'll provide you with return instructions and a return authorization number</li>
                <li>Ship the item back to us in its original condition</li>
                <li>Once we receive and inspect the item, if exchange is accepted by us, exchanged product will be delivered within 7-10 business days</li>
              </ol>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-light text-foreground">How to Return or Exchange</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>
                  Email us at{" "}
                  <a href="mailto:hello@medhueastore.com" className="underline hover:text-accent">
                    hello@medhueastore.com
                  </a>{" "}
                  with your order number and reason for return/exchange
                </li>
                <li>We'll send you a return authorization number and shipping instructions</li>
                <li>Package the item securely with original tags and packaging</li>
                <li>Ship the item to the address provided</li>
                <li>We'll process your return or exchange once we receive the item</li>
              </ol>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-light text-foreground">Refund Process</h2>
              <p>
                For returns, once we receive and inspect your item, we will notify you of the approval or rejection of
                your refund. If approved, the refund will be processed and a credit will be applied to your original
                payment method within 5-10 business days.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-light text-foreground">Non-Returnable Items</h2>
              <p>The following items cannot be returned or exchanged:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Items that have been worn, washed, or damaged</li>
                <li>Items without original tags or packaging</li>
                <li>Customized or personalized items</li>
                <li>Items purchased on final sale</li>
                <li>Items returned after the 30-day return period</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-light text-foreground">Contact Us</h2>
              <p>
                For questions about returns and exchanges, please contact us at{" "}
                <a href="mailto:hello@medhueastore.com" className="underline hover:text-accent">
                  hello@medhueastore.com
                </a>
                . Our customer service team is here to help!
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

