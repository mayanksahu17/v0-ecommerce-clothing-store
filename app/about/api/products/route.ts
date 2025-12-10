import { NextRequest, NextResponse } from 'next/server'
import { getProducts, createProduct } from '@/lib/models/Product'

export async function GET() {
  const requestId = crypto.randomUUID()
  const startTime = Date.now()
  
  try {
    console.log(`[${new Date().toISOString()}] [${requestId}] GET /api/products - Request Started`)
    const products = await getProducts()
    const duration = Date.now() - startTime
    console.log(`[${new Date().toISOString()}] [${requestId}] GET /api/products - Success: ${products.length} products - Duration: ${duration}ms`)
    return NextResponse.json(products)
  } catch (error) {
    const duration = Date.now() - startTime
    console.error(`[${new Date().toISOString()}] [${requestId}] GET /api/products - Error - Duration: ${duration}ms`, {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    })
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const requestId = crypto.randomUUID()
  const startTime = Date.now()
  
  try {
    console.log(`[${new Date().toISOString()}] [${requestId}] POST /api/products - Request Started`)
    const body = await request.json()
    console.log(`[${new Date().toISOString()}] [${requestId}] Creating product:`, { name: body.name, category: body.category, price: body.price })
    
    const productId = await createProduct({
      name: body.name,
      price: body.price,
      category: body.category,
      colors: body.colors || [],
      sizes: body.sizes || [],
      image: body.image || '',
      images: body.images || [],
      description: body.description || '',
      rating: body.rating || 0,
      reviews: body.reviews || 0,
    })
    
    const duration = Date.now() - startTime
    console.log(`[${new Date().toISOString()}] [${requestId}] POST /api/products - Success: Product ID ${productId} - Duration: ${duration}ms`)
    
    return NextResponse.json({ id: productId, message: 'Product created successfully' })
  } catch (error) {
    const duration = Date.now() - startTime
    console.error(`[${new Date().toISOString()}] [${requestId}] POST /api/products - Error - Duration: ${duration}ms`, {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    })
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}

