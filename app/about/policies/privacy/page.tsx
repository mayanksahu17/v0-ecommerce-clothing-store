import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-background">
      <Header />
      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-light mb-8">Privacy Policy</h1>
          <div className="prose prose-invert space-y-6 text-sm text-muted-foreground">
            <p>Last updated: November 2025</p>

            <section className="space-y-4">
              <h2 className="text-2xl font-light text-foreground">Privacy Policy – Medhuea Store</h2>
              <p>
                At Medhuea Store, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or make purchases.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-light text-foreground">Information We Collect</h2>
              <p>
                <strong className="text-foreground">Personal Information:</strong> Name, email address, phone number, shipping & billing address, and payment information.
              </p>
              <p>
                <strong className="text-foreground">Non-Personal Information:</strong> Browser type, device information, IP address, browsing behavior on our site.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-light text-foreground">How We Use Your Information</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>To process and deliver your orders.</li>
                <li>To communicate with you regarding your orders, promotions, or offers.</li>
                <li>To improve our website, products, and services.</li>
                <li>To prevent fraud and ensure security.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-light text-foreground">How We Protect Your Information</h2>
              <p>
                We implement industry-standard measures to secure your personal data. Sensitive information like payment details is encrypted during transactions.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-light text-foreground">Sharing Your Information</h2>
              <p>
                We do not sell or rent your personal information. We may share it with trusted third parties for order fulfillment, payment processing, or as required by law.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-light text-foreground">Your Rights</h2>
              <p>
                You may access, update, or request deletion of your personal information by contacting us at{" "}
                <a href="mailto:hello@medhueastore.com" className="underline hover:text-accent">
                  hello@medhueastore.com
                </a>
                .
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-light text-foreground">Cookies</h2>
              <p>
                Our website uses cookies to enhance user experience. You can disable cookies in your browser settings, but this may affect website functionality.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-light text-foreground">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at{" "}
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
