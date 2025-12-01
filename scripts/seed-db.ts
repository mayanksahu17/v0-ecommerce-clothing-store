// Load environment variables FIRST - must be before any other imports
import dotenv from 'dotenv'
import { resolve } from 'path'

// Load .env.local file
const envPath = resolve(process.cwd(), '.env.local')
const result = dotenv.config({ path: envPath })

if (result.error) {
  console.error('Error loading .env.local:', result.error)
  process.exit(1)
}

// Verify the environment variable is loaded
if (!process.env.MONGODB_URL_DEVELOPMENT) {
  console.error('Error: MONGODB_URL_DEVELOPMENT not found in .env.local')
  console.error(`Looking for .env.local at: ${envPath}`)
  process.exit(1)
}

// Now import other modules that depend on environment variables
import clientPromise from '../lib/mongodb'
import { products } from '../lib/mock-data'

async function seedDatabase() {
  try {
    const client = await clientPromise()
    const db = client.db('products')
    const collection = db.collection('products')

    // Clear existing products
    await collection.deleteMany({})

    // Insert products
    const productsToInsert = products.map(product => ({
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
      createdAt: new Date(),
      updatedAt: new Date(),
    }))

    const result = await collection.insertMany(productsToInsert)
    console.log(`Successfully inserted ${result.insertedCount} products`)
    process.exit(0)
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()

