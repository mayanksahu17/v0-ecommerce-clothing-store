"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState, useEffect } from "react"
import { Trash2, Plus, Upload, X, Edit3, Star } from "lucide-react"
import type { Product } from "@/lib/types"

type ProductFormState = {
  name: string
  price: string
  category: string
  description: string
  colorsInput: string
  sizesInput: string
  image: string
  images: string[]
  rating: string
  reviews: string
}

const getEmptyFormState = (): ProductFormState => ({
  name: "",
  price: "",
  category: "tops",
  description: "",
  colorsInput: "",
  sizesInput: "",
  image: "",
  images: [],
  rating: "4.5",
  reviews: "0",
})

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [formMode, setFormMode] = useState<"create" | "edit">("create")
  const [editingProductId, setEditingProductId] = useState<string | null>(null)
  const [formData, setFormData] = useState<ProductFormState>(getEmptyFormState())
  const [uploading, setUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [newImageUrl, setNewImageUrl] = useState("")

  const isEditing = formMode === "edit" && Boolean(editingProductId)

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleOpenCreateForm = () => {
    setFormMode("create")
    setEditingProductId(null)
    setFormData(getEmptyFormState())
    setNewImageUrl("")
    setSelectedFile(null)
    setIsFormVisible(true)
  }

  const handleCloseForm = () => {
    setIsFormVisible(false)
    setFormMode("create")
    setEditingProductId(null)
    setFormData(getEmptyFormState())
    setNewImageUrl("")
    setSelectedFile(null)
  }

  const handleEditProduct = (product: Product) => {
    setFormMode("edit")
    setEditingProductId(product.id)
    setFormData({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      description: product.description,
      colorsInput: product.colors.join(", "),
      sizesInput: product.sizes.join(", "),
      image: product.image || product.images?.[0] || "",
      images: product.images?.length ? product.images : product.image ? [product.image] : [],
      rating: product.rating.toString(),
      reviews: product.reviews.toString(),
    })
    setNewImageUrl("")
    setSelectedFile(null)
    setIsFormVisible(true)
  }

  const addImageToGallery = (url: string) => {
    const cleanedUrl = url.trim()
    if (!cleanedUrl) return

    setFormData((prev) => {
      const alreadyExists = prev.images.includes(cleanedUrl)
      const updatedList = alreadyExists ? prev.images : [...prev.images, cleanedUrl]
      const primaryImage = prev.image || cleanedUrl
      const ordered =
        primaryImage !== ""
          ? [primaryImage, ...updatedList.filter((img) => img !== primaryImage)]
          : updatedList

      return {
        ...prev,
        image: primaryImage,
        images: ordered,
      }
    })
  }

  const handleAddImageByUrl = () => {
    if (!newImageUrl.trim()) return
    addImageToGallery(newImageUrl)
    setNewImageUrl("")
  }

  const handleRemoveImage = (url: string) => {
    setFormData((prev) => {
      const filtered = prev.images.filter((img) => img !== url)
      const newPrimary = prev.image === url ? filtered[0] || "" : prev.image
      const ordered = newPrimary
        ? [newPrimary, ...filtered.filter((img) => img !== newPrimary)]
        : filtered

      return {
        ...prev,
        image: newPrimary,
        images: ordered,
      }
    })
  }

  const handleSetPrimaryImage = (url: string) => {
    setFormData((prev) => {
      if (!prev.images.includes(url)) {
        return prev
      }
      const remaining = prev.images.filter((img) => img !== url)
      return {
        ...prev,
        image: url,
        images: [url, ...remaining],
      }
    })
  }

  const fetchProducts = async () => {
    try {
      const response = await fetch('/about/api/products')
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
      const response = await fetch(`/about/api/products/${id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        setProducts(products.filter(p => p.id !== id))
        if (editingProductId === id) {
          handleCloseForm()
        }
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

      const response = await fetch('/about/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      if (data.url) {
        addImageToGallery(data.url)
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

    const priceValue = Number(formData.price)
    if (!Number.isFinite(priceValue)) {
      alert('Please enter a valid price')
      return
    }

    if (priceValue < 0) {
      alert('Price must be greater than or equal to 0')
      return
    }

    const colorsArray = formData.colorsInput
      .split(',')
      .map((c) => c.trim())
      .filter((c) => c)
    const sizesArray = formData.sizesInput
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s)
    const gallery = formData.images.length
      ? formData.images
      : formData.image
      ? [formData.image]
      : []

    if (gallery.length === 0) {
      alert('Please upload at least one product image')
      return
    }

    const payload = {
      name: formData.name,
      price: priceValue,
      category: formData.category,
      description: formData.description,
      colors: colorsArray,
      sizes: sizesArray,
      image: gallery[0],
      images: gallery,
      rating: Number(formData.rating) || 0,
      reviews: Number(formData.reviews) || 0,
    }

    try {
      const endpoint = isEditing && editingProductId ? `/about/api/products/${editingProductId}` : '/about/api/products'
      const method = isEditing ? 'PATCH' : 'POST'
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        alert(isEditing ? 'Product updated successfully' : 'Product created successfully')
        handleCloseForm()
        fetchProducts()
      } else {
        alert('Failed to save product')
      }
    } catch (error) {
      console.error('Error saving product:', error)
      alert('Failed to save product')
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
              onClick={handleOpenCreateForm}
              className="flex items-center gap-2 px-6 py-3 bg-foreground text-background hover:bg-accent transition"
            >
              <Plus size={20} />
              Add Product
            </button>
          </div>

          {/* SabPaisa Configuration Section */}
          <div className="bg-secondary p-8 mb-8 border border-border">
            <h2 className="text-2xl font-light mb-6">SabPaisa Payment Gateway Configuration</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-light mb-2 text-muted-foreground">Client Code</label>
                <div className="px-4 py-3 bg-input border border-border text-sm font-mono">
                  PRAB96
                </div>
              </div>
              <div>
                <label className="block text-sm font-light mb-2 text-muted-foreground">Username</label>
                <div className="px-4 py-3 bg-input border border-border text-sm">
                  prabhash7049@gmail.com
                </div>
              </div>
              <div>
                <label className="block text-sm font-light mb-2 text-muted-foreground">Password</label>
                <div className="px-4 py-3 bg-input border border-border text-sm font-mono">
                  ••••••••••••
                </div>
              </div>
              <div>
                <label className="block text-sm font-light mb-2 text-muted-foreground">Environment</label>
                <div className="px-4 py-3 bg-input border border-border text-sm">
                  PROD (Production)
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-light mb-2 text-muted-foreground">Payment Gateway URL</label>
                <div className="px-4 py-3 bg-input border border-border text-sm break-all">
                  https://securepay.sabpaisa.in/SabPaisa/sabPaisaInit?v=1
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-light mb-2 text-muted-foreground">Authentication Key</label>
                <div className="px-4 py-3 bg-input border border-border text-sm font-mono break-all">
                  SAUWc4kFIy7mTMdUay5iL91vFDYZLvGW91nPJSLMmqg=
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-light mb-2 text-muted-foreground">Authentication IV</label>
                <div className="px-4 py-3 bg-input border border-border text-sm font-mono break-all">
                  VFqeaLPIO0x3TnnE6rDLFqAtrNzVPtgivohLVI90VRWYIKi8834zyey5SIRMz8gc
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-light mb-2 text-muted-foreground">Callback URL (Whitelisted)</label>
                <div className="px-4 py-3 bg-input border border-border text-sm">
                  https://madhuea.store/about
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Using whitelisted domain: madhuea.store/about
                </p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-background border border-border">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Note:</strong> These credentials are configured via environment variables. 
                To update them, modify the <code className="bg-secondary px-1 py-0.5">.env.local</code> file with the following variables:
              </p>
              <ul className="mt-2 text-sm text-muted-foreground list-disc list-inside space-y-1">
                <li><code className="bg-secondary px-1 py-0.5">NEXT_PUBLIC_SABPAISA_CLIENT_CODE</code> - Your SabPaisa client code (PRAB96)</li>
                <li><code className="bg-secondary px-1 py-0.5">NEXT_PUBLIC_SABPAISA_USERNAME</code> - Your SabPaisa username</li>
                <li><code className="bg-secondary px-1 py-0.5">NEXT_PUBLIC_SABPAISA_PASSWORD</code> - Your SabPaisa password</li>
                <li><code className="bg-secondary px-1 py-0.5">NEXT_PUBLIC_SABPAISA_AUTH_KEY</code> - Authentication key for encryption</li>
                <li><code className="bg-secondary px-1 py-0.5">NEXT_PUBLIC_SABPAISA_AUTH_IV</code> - Authentication IV for encryption</li>
                <li><code className="bg-secondary px-1 py-0.5">NEXT_PUBLIC_BASE_URL</code> - Your application base URL (e.g., http://localhost:3000)</li>
              </ul>
              <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded">
                <p className="text-sm text-yellow-700 dark:text-yellow-400">
                  <strong>Current Configuration:</strong> Client Code: PRAB96 | Username: prabhash7049@gmail.com | Environment: PROD (Production) | Payment URL: https://securepay.sabpaisa.in/SabPaisa/sabPaisaInit?v=1
                </p>
              </div>
            </div>
          </div>

          {isFormVisible && (
            <div className="bg-secondary p-8 mb-8 border border-border">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-light">
                    {isEditing ? 'Edit Product' : 'Add New Product'}
                  </h2>
                  {isEditing && (
                    <p className="text-sm text-muted-foreground">
                      Updating <span className="font-medium">{formData.name}</span>
                    </p>
                  )}
                </div>
                <button
                  onClick={handleCloseForm}
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
                      min="0"
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
                      value={formData.colorsInput}
                      onChange={(e) => setFormData({ ...formData, colorsInput: e.target.value })}
                      placeholder="black, white, navy"
                      className="w-full px-4 py-3 bg-input border border-border text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-light mb-2">Sizes (comma-separated)</label>
                    <input
                      type="text"
                      required
                      value={formData.sizesInput}
                      onChange={(e) => setFormData({ ...formData, sizesInput: e.target.value })}
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
                      <p className="text-sm text-muted-foreground mb-2">Primary image preview</p>
                      <img src={formData.image} alt="Primary preview" className="w-32 h-32 object-cover border border-border" />
                    </div>
                  )}
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-light">Image Gallery</label>
                      {formData.images.length > 0 && (
                        <span className="text-xs text-muted-foreground">Tip: set a hero image for the product carousel</span>
                      )}
                    </div>
                    {formData.images.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No images added yet. Upload or paste a URL to get started.</p>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {formData.images.map((img) => (
                          <div key={img} className="border border-border bg-background p-3">
                            <div className="relative">
                              <img src={img} alt="Product preview" className="w-full h-40 object-cover" />
                              {formData.image === img && (
                                <span className="absolute top-2 left-2 bg-foreground/80 text-background text-xs px-2 py-0.5 flex items-center gap-1">
                                  <Star size={12} />
                                  Primary
                                </span>
                              )}
                            </div>
                            <div className="flex gap-2 mt-3">
                              <button
                                type="button"
                                onClick={() => handleSetPrimaryImage(img)}
                                disabled={formData.image === img}
                                className="flex-1 text-xs border border-border px-2 py-1 disabled:opacity-50"
                              >
                                Set primary
                              </button>
                              <button
                                type="button"
                                onClick={() => handleRemoveImage(img)}
                                className="flex-1 text-xs text-red-500 border border-red-200 px-2 py-1 hover:text-red-600"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-light mb-2">Add Image by URL</label>
                    <div className="flex flex-col md:flex-row gap-4">
                      <input
                        type="url"
                        value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className="w-full px-4 py-3 bg-input border border-border text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
                      />
                      <button
                        type="button"
                        onClick={handleAddImageByUrl}
                        disabled={!newImageUrl.trim()}
                        className="px-6 py-3 border border-border text-sm uppercase tracking-wide disabled:opacity-50 flex items-center gap-2 justify-center"
                      >
                        <Plus size={16} />
                        Add Image
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-foreground text-background hover:bg-accent transition font-light tracking-wide"
                >
                  {isEditing ? 'Update Product' : 'Create Product'}
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
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="text-muted-foreground hover:text-foreground transition"
                          >
                            <Edit3 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="text-red-500 hover:text-red-700 transition"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
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

