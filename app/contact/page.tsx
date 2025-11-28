"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState } from "react"

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setFormData({ name: "", email: "", subject: "", message: "" })
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <main className="bg-background">
      <Header />

      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-light mb-6">Contact Us</h1>
          <p className="text-muted-foreground mb-12">
            Have a question or comment? We'd love to hear from you. Reach out to us and we'll get back to you as soon as
            possible.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-light mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-input border border-border text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-light mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-input border border-border text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-light mb-2">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-input border border-border text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
                placeholder="What is this about?"
              />
            </div>

            <div>
              <label className="block text-sm font-light mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full px-4 py-3 bg-input border border-border text-sm focus:outline-none focus:ring-1 focus:ring-foreground resize-none"
                placeholder="Your message..."
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-foreground text-background hover:bg-accent transition font-light tracking-wide"
            >
              Send Message
            </button>

            {submitted && (
              <div className="p-4 bg-secondary text-foreground text-center text-sm font-light">
                Thank you! We've received your message and will respond shortly.
              </div>
            )}
          </form>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 border-t border-border">
            <div className="text-center">
              <h3 className="text-lg font-light mb-2">Email</h3>
              <a
                href="mailto:hello@medhueastore.com"
                className="text-sm text-muted-foreground hover:text-accent transition"
              >
                hello@medhueastore.com
              </a>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-light mb-2">Phone</h3>
              <a href="tel:+1234567890" className="text-sm text-muted-foreground hover:text-accent transition">
                +1 (234) 567-890
              </a>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-light mb-2">Hours</h3>
              <p className="text-sm text-muted-foreground">Mon - Fri: 9AM - 6PM EST</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
