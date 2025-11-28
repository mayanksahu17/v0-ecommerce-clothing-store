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
              <h2 className="text-2xl font-light text-foreground">Introduction</h2>
              <p>
                Medhuea Store ("we" or "us" or "our") operates the website. This page informs you of our policies
                regarding the collection, use, and disclosure of personal data when you use our Service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-light text-foreground">Information Collection and Use</h2>
              <p>
                We collect several different types of information for various purposes to provide and improve our
                Service to you.
              </p>
              <h3 className="text-lg font-light text-foreground">Types of Data Collected:</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Personal Data: Name, email address, phone number, shipping address</li>
                <li>Usage Data: Browser type, IP address, pages visited, time spent</li>
                <li>Cookies: To enhance your browsing experience</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-light text-foreground">Use of Data</h2>
              <p>Medhuea Store uses the collected data for various purposes:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>To provide and maintain our Service</li>
                <li>To notify you about changes to our Service</li>
                <li>To allow you to participate in interactive features</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information</li>
                <li>To monitor the usage of our Service</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-light text-foreground">Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at hello@medhueastore.com</p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
