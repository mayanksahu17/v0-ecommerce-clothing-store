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
              <h2 className="text-2xl font-light text-foreground">Agreement to Terms</h2>
              <p>
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this
                agreement.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-light text-foreground">Use License</h2>
              <p>
                Permission is granted to temporarily download one copy of the materials (information or software) on
                Medhuea Store's website for personal, non-commercial transitory viewing only. This is the grant of a
                license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on the website</li>
                <li>Remove any copyright or proprietary notations</li>
                <li>Transfer the materials to another person or "mirror" the materials</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-light text-foreground">Disclaimer</h2>
              <p>
                The materials on Medhuea Store's website are provided on an 'as is' basis. Medhuea Store makes no
                warranties, expressed or implied, and hereby disclaims and negates all other warranties including,
                without limitation, implied warranties or conditions of merchantability, fitness for a particular
                purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-light text-foreground">Limitations</h2>
              <p>
                In no event shall Medhuea Store or its suppliers be liable for any damages (including, without
                limitation, damages for loss of data or profit, or due to business interruption) arising out of the use
                or inability to use the materials on Medhuea Store's website.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-light text-foreground">Contact Us</h2>
              <p>If you have any questions about these Terms & Conditions, please contact us at hello@medhueastore.com</p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
