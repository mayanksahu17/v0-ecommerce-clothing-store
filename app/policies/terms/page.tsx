import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  return (
    <main className="bg-background">
      <Header />
      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-light mb-8">Terms & Conditions</h1>
          <div className="prose prose-invert space-y-6 text-sm text-muted-foreground">
            <p>Last updated: November 2025</p>

            <section className="space-y-4">
              <h2 className="text-2xl font-light text-foreground">Terms & Conditions – Medhuea Store</h2>
              <p>
                Welcome to Medhuea Store! By using our website, you agree to the following terms and conditions:
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-light text-foreground">1. General</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Medhuea Store reserves the right to modify these terms at any time.</li>
                <li>Continued use of our website indicates acceptance of updated terms.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-light text-foreground">2. Products</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>We make every effort to display product colors accurately, but we cannot guarantee exact color representation.</li>
                <li>Prices and availability are subject to change without notice.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-light text-foreground">3. Orders</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Orders are subject to acceptance and availability.</li>
                <li>We reserve the right to refuse or cancel orders at our discretion.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-light text-foreground">4. Intellectual Property</h2>
              <p>
                All content on this website, including images, text, and designs, is owned by <strong className="text-foreground">NineXFold agency llp</strong> and protected by copyright.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-light text-foreground">5. Liability</h2>
              <p>
                Medhuea Store is not liable for any indirect or consequential damages arising from the use of our products or website.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-light text-foreground">6. Governing Law</h2>
              <p>
                These terms are governed by the laws of Madhya Pradesh.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-light text-foreground">Cancellation Policy</h2>
              <p>
                Our Cancellation Policy allows order cancellations within 24 hours of purchase.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-light text-foreground">Contact Us</h2>
              <p>
                This website is operated by Medhuea Store, owned by <strong className="text-foreground">NineXFold agency llp</strong>. If you have any questions about these Terms & Conditions, please contact us at{" "}
                <a href="mailto:Prabhash7049@gmail.com" className="underline hover:text-accent">
                  Prabhash7049@gmail.com
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
