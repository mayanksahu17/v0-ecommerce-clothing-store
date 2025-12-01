import { ObjectId, type ModifyResult } from 'mongodb'
import clientPromise from '../mongodb'

export interface ProductDocument {
  _id?: ObjectId | string
  name: string
  price: number
  category: string
  colors: string[]
  sizes: string[]
  image: string
  images: string[]
  description: string
  rating: number
  reviews: number
  createdAt?: Date
  updatedAt?: Date
}

function sanitizeStringArray(values: string[] = []) {
  return values
    .map(value => value?.trim())
    .filter((value): value is string => Boolean(value))
}

function buildImageState(image?: string, images: string[] = []) {
  const cleanedImages = Array.from(new Set(sanitizeStringArray(images)))
  let primary = image?.trim() || ''

  if (!primary && cleanedImages.length > 0) {
    primary = cleanedImages[0]
  }

  const filtered = cleanedImages.filter(url => url !== primary)
  return {
    primary,
    orderedGallery: primary ? [primary, ...filtered] : filtered,
  }
}

function mapProduct(product: ProductDocument) {
  const { primary, orderedGallery } = buildImageState(product.image, product.images)

  return {
    id: typeof product._id === 'string' ? product._id : product._id?.toString() || '',
    name: product.name,
    price: product.price,
    category: product.category,
    colors: product.colors,
    sizes: product.sizes,
    image: primary,
    images: orderedGallery,
    description: product.description,
    rating: product.rating,
    reviews: product.reviews,
  }
}

export async function getProducts() {
  try {
    const client = await clientPromise()
    const db = client.db('products')
    const products = await db.collection<ProductDocument>('products').find({}).toArray()
    return products.map(mapProduct)
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}

export async function getProductById(id: string) {
  try {
    const client = await clientPromise()
    const db = client.db('products')
    
    // Validate ObjectId format
    if (!ObjectId.isValid(id)) {
      console.error('Invalid ObjectId format:', id)
      return null
    }
    
    const product = await db.collection<ProductDocument>('products').findOne({ _id: new ObjectId(id) })
    
    if (!product) {
      console.error('Product not found with id:', id)
      return null
    }
    
    return mapProduct(product)
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

export async function createProduct(product: Omit<ProductDocument, '_id' | 'createdAt' | 'updatedAt'>) {
  try {
    const client = await clientPromise()
    const db = client.db('products')
    const { primary, orderedGallery } = buildImageState(product.image, product.images)
    const result = await db.collection<ProductDocument>('products').insertOne({
      ...product,
      image: primary,
      images: orderedGallery,
      colors: sanitizeStringArray(product.colors),
      sizes: sanitizeStringArray(product.sizes),
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return result.insertedId.toString()
  } catch (error) {
    console.error('Error creating product:', error)
    throw error
  }
}

export async function updateProduct(
  id: string,
  updates: Partial<Omit<ProductDocument, '_id' | 'createdAt' | 'updatedAt'>>
) {
  try {
    if (!ObjectId.isValid(id)) {
      console.error('Invalid ObjectId format for update:', id)
      return null
    }

    const client = await clientPromise()
    const db = client.db('products')
    const collection = db.collection<ProductDocument>('products')

    const existing = await collection.findOne({ _id: new ObjectId(id) })
    if (!existing) {
      console.error('Cannot update missing product:', id)
      return null
    }

    const updateDoc: Partial<ProductDocument> = {}

    if (typeof updates.name === 'string') updateDoc.name = updates.name
    if (typeof updates.price === 'number') updateDoc.price = updates.price
    if (typeof updates.category === 'string') updateDoc.category = updates.category
    if (typeof updates.description === 'string') updateDoc.description = updates.description
    if (typeof updates.rating === 'number') updateDoc.rating = updates.rating
    if (typeof updates.reviews === 'number') updateDoc.reviews = updates.reviews
    if (Array.isArray(updates.colors)) updateDoc.colors = sanitizeStringArray(updates.colors)
    if (Array.isArray(updates.sizes)) updateDoc.sizes = sanitizeStringArray(updates.sizes)

    if (updates.image !== undefined || Array.isArray(updates.images)) {
      const { primary, orderedGallery } = buildImageState(
        updates.image ?? existing.image,
        updates.images ?? existing.images
      )
      updateDoc.image = primary
      updateDoc.images = orderedGallery
    }

    if (Object.keys(updateDoc).length === 0) {
      return mapProduct(existing)
    }

    const rawResult = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...updateDoc,
          updatedAt: new Date(),
        },
      },
      { returnDocument: 'after' }
    )
    const result = rawResult as unknown as ModifyResult<ProductDocument>

    return result.value ? mapProduct(result.value) : null
  } catch (error) {
    console.error('Error updating product:', error)
    throw error
  }
}

export async function deleteProduct(id: string) {
  try {
    const client = await clientPromise()
    const db = client.db('products')
    const result = await db.collection<ProductDocument>('products').deleteOne({ _id: new ObjectId(id) })
    return result.deletedCount > 0
  } catch (error) {
    console.error('Error deleting product:', error)
    throw error
  }
}

