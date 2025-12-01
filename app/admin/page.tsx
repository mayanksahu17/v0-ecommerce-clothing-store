"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState, useEffect } from "react"
import { Trash2, Plus, Upload, X } from "lucide-react"
import type { Product } from "@/lib/types"

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "tops",
    description: "",
    colors: "",
    sizes: "",
    image: "",
    images: "",
    rating: "4.5",
    reviews: "0",
  })
  const [uploading, setUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        setProducts(products.filter(p => p.id !== id))
        alert('Product deleted successfully')
      } else {
        alert('Failed to delete product')
      }
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('Failed to delete product')
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleImageUpload = async () => {
    if (!selectedFile) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', selectedFile)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      if (data.url) {
        setFormData(prev => ({
          ...prev,
          image: data.url,
          images: prev.images ? `${prev.images},${data.url}` : data.url,
        }))
        setSelectedFile(null)
        alert('Image uploaded successfully')
      } else {
        alert('Failed to upload image')
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          price: Number(formData.price),
          category: formData.category,
          description: formData.description,
          colors: formData.colors.split(',').map(c => c.trim()).filter(c => c),
          sizes: formData.sizes.split(',').map(s => s.trim()).filter(s => s),
          image: formData.image,
          images: formData.images.split(',').map(i => i.trim()).filter(i => i),
          rating: Number(formData.rating),
          reviews: Number(formData.reviews),
        }),
      })

      if (response.ok) {
        alert('Product created successfully')
        setShowAddForm(false)
        setFormData({
          name: "",
          price: "",
          category: "tops",
          description: "",
          colors: "",
          sizes: "",
          image: "",
          images: "",
          rating: "4.5",
          reviews: "0",
        })
        fetchProducts()
      } else {
        alert('Failed to create product')
      }
    } catch (error) {
      console.error('Error creating product:', error)
      alert('Failed to create product')
    }
  }

  if (loading) {
    return (
      <main className="bg-background">
        <Header />
        <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">Loading...</div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="bg-background">
      <Header />
      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-light">Admin Portal</h1>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-2 px-6 py-3 bg-foreground text-background hover:bg-accent transition"
            >
              <Plus size={20} />
              Add Product
            </button>
          </div>

          {showAddForm && (
            <div className="bg-secondary p-8 mb-8 border border-border">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-light">Add New Product</h2>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-light mb-2">Product Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-input border border-border text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-light mb-2">Price (₹)</label>
                    <input
                      type="number"
                      required
                      min="2599"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-4 py-3 bg-input border border-border text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-light mb-2">Category</label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 bg-input border border-border text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
                    >
                      <option value="tops">Tops</option>
                      <option value="bottoms">Bottoms</option>
                      <option value="dresses">Dresses</option>
                      <option value="outerwear">Outerwear</option>
                      <option value="shoes">Shoes</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-light mb-2">Description</label>
                    <textarea
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 bg-input border border-border text-sm focus:outline-none focus:ring-1 focus:ring-foreground resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-light mb-2">Colors (comma-separated)</label>
                    <input
                      type="text"
                      required
                      value={formData.colors}
                      onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                      placeholder="black, white, navy"
                      className="w-full px-4 py-3 bg-input border border-border text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-light mb-2">Sizes (comma-separated)</label>
                    <input
                      type="text"
                      required
                      value={formData.sizes}
                      onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                      placeholder="XS, S, M, L, XL"
                      className="w-full px-4 py-3 bg-input border border-border text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-light mb-2">Rating</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                      className="w-full px-4 py-3 bg-input border border-border text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-light mb-2">Reviews Count</label>
                    <input
                      type="number"
                      min="0"
                      value={formData.reviews}
                      onChange={(e) => setFormData({ ...formData, reviews: e.target.value })}
                      className="w-full px-4 py-3 bg-input border border-border text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-light mb-2">Image Upload</label>
                  <div className="flex gap-4 items-end">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="w-full px-4 py-3 bg-input border border-border text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
                    />
                    <button
                      type="button"
                      onClick={handleImageUpload}
                      disabled={!selectedFile || uploading}
                      className="px-6 py-3 bg-foreground text-background hover:bg-accent transition disabled:opacity-50 flex items-center gap-2"
                    >
                      <Upload size={20} />
                      {uploading ? 'Uploading...' : 'Upload'}
                    </button>
                  </div>
                  {formData.image && (
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground mb-2">Main Image URL:</p>
                      <input
                        type="text"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className="w-full px-4 py-3 bg-input border border-border text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
                      />
                      {formData.image && (
                        <img src={formData.image} alt="Preview" className="mt-2 w-32 h-32 object-cover" />
                      )}
                    </div>
                  )}
                  <div className="mt-4">
                    <label className="block text-sm font-light mb-2">Additional Images (comma-separated URLs)</label>
                    <textarea
                      value={formData.images}
                      onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                      rows={2}
                      placeholder="https://..., https://..."
                      className="w-full px-4 py-3 bg-input border border-border text-sm focus:outline-none focus:ring-1 focus:ring-foreground resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-foreground text-background hover:bg-accent transition font-light tracking-wide"
                >
                  Create Product
                </button>
              </form>
            </div>
          )}

          <div className="bg-secondary p-8">
            <h2 className="text-2xl font-light mb-6">All Products ({products.length})</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-4 text-sm font-light">Image</th>
                    <th className="pb-4 text-sm font-light">Name</th>
                    <th className="pb-4 text-sm font-light">Category</th>
                    <th className="pb-4 text-sm font-light">Price</th>
                    <th className="pb-4 text-sm font-light">Rating</th>
                    <th className="pb-4 text-sm font-light">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-border">
                      <td className="py-4">
                        <img
                          src={product.image || '/placeholder.jpg'}
                          alt={product.name}
                          className="w-16 h-16 object-cover"
                        />
                      </td>
                      <td className="py-4 text-sm font-light">{product.name}</td>
                      <td className="py-4 text-sm text-muted-foreground">{product.category}</td>
                      <td className="py-4 text-sm font-light">₹{product.price}</td>
                      <td className="py-4 text-sm text-muted-foreground">{product.rating} ({product.reviews})</td>
                      <td className="py-4">
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-500 hover:text-red-700 transition"
                        >
                          <Trash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

