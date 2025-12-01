import clientPromise from '../mongodb'

export interface ProductDocument {
  _id?: string
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

export async function getProducts() {
  try {
    const client = await clientPromise()
    const db = client.db('products')
    const products = await db.collection<ProductDocument>('products').find({}).toArray()
    return products.map(product => ({
      id: product._id?.toString() || '',
      name: product.name,
      price: product.price,
      category: product.category,
      colors: product.colors,
      sizes: product.sizes,
      image: product.image,
      images: product.images,
      description: product.description,
      rating: product.rating,
      reviews: product.reviews,
    }))
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}

export async function getProductById(id: string) {
  try {
    const client = await clientPromise()
    const db = client.db('products')
    const { ObjectId } = require('mongodb')
    
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
    
    return {
      id: product._id?.toString() || '',
      name: product.name,
      price: product.price,
      category: product.category,
      colors: product.colors,
      sizes: product.sizes,
      image: product.image,
      images: product.images,
      description: product.description,
      rating: product.rating,
      reviews: product.reviews,
    }
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

export async function createProduct(product: Omit<ProductDocument, '_id' | 'createdAt' | 'updatedAt'>) {
  try {
    const client = await clientPromise()
    const db = client.db('products')
    const result = await db.collection<ProductDocument>('products').insertOne({
      ...product,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return result.insertedId.toString()
  } catch (error) {
    console.error('Error creating product:', error)
    throw error
  }
}

export async function deleteProduct(id: string) {
  try {
    const client = await clientPromise()
    const db = client.db('products')
    const { ObjectId } = require('mongodb')
    const result = await db.collection<ProductDocument>('products').deleteOne({ _id: new ObjectId(id) })
    return result.deletedCount > 0
  } catch (error) {
    console.error('Error deleting product:', error)
    throw error
  }
}

