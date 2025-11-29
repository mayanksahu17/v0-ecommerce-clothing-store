import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <main className="bg-background">
      <Header />

      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          <h1 className="text-4xl font-light">About Medhuea Store</h1>

          <div className="bg-secondary aspect-video overflow-hidden">
            <img src="/urban-thread-co-luxury-fashion-brand-minimal-studi.jpg" alt="About Medhuea Store" className="w-full h-full object-cover" />
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-light">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed">
              Medhuea Store was founded with a vision to create premium fashion that celebrates minimalism and
              quality craftsmanship. We believe that timeless design and sustainable practices go hand in hand, and
              we're committed to offering pieces that transcend trends.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Every garment is thoughtfully designed and ethically produced using sustainable materials. We work
              directly with manufacturers who share our values of fair labor practices and environmental responsibility.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-light">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              To provide contemporary fashion that empowers individuals to express their style through quality, minimal
              design. We're dedicated to creating a more sustainable fashion industry, one piece at a time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-y border-border">
            <div className="text-center space-y-3">
              <h3 className="text-2xl font-light">100%</h3>
              <p className="text-sm text-muted-foreground">Sustainable Materials</p>
            </div>
            <div className="text-center space-y-3">
              <h3 className="text-2xl font-light">Fair</h3>
              <p className="text-sm text-muted-foreground">Labor Practices</p>
            </div>
            <div className="text-center space-y-3">
              <h3 className="text-2xl font-light">∞</h3>
              <p className="text-sm text-muted-foreground">Timeless Design</p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-light">Contact Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-light mb-2">Email</h3>
                <a href="mailto:Prabhash7049@gmail.com" className="text-sm hover:text-accent transition">
                  Prabhash7049@gmail.com
                </a>
              </div>
              <div>
                <h3 className="font-light mb-2">Phone</h3>
                <a href="tel:+917049407951" className="text-sm hover:text-accent transition">
                  +91 7049407951
                </a>
              </div>
              <div>
                <h3 className="font-light mb-2">Address</h3>
                <p className="text-sm text-muted-foreground">
                  353 MR3 Road, Mahalakshmi Nagar<br />
                  Indore - 452010
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Medhuea Store is owned by <strong className="text-foreground">NineXFold agency llp</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
