import { NextRequest, NextResponse } from 'next/server'
import { deleteProduct, getProductById, updateProduct, type ProductDocument } from '@/lib/models/Product'

function toNumber(value: unknown) {
  if (value === undefined || value === null || value === '') return undefined
  const parsed = Number(value)
  return Number.isNaN(parsed) ? undefined : parsed
}

function toStringArray(value: unknown) {
  if (!Array.isArray(value)) return undefined
  return value.map((entry) => (typeof entry === 'string' ? entry : String(entry)))
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  const requestId = crypto.randomUUID()
  const startTime = Date.now()
  
  try {
    const resolvedParams = params instanceof Promise ? await params : params
    console.log(`[${new Date().toISOString()}] [${requestId}] GET /api/products/${resolvedParams.id} - Request Started`)
    
    const product = await getProductById(resolvedParams.id)
    
    if (!product) {
      const duration = Date.now() - startTime
      console.error(`[${new Date().toISOString()}] [${requestId}] Product not found - ID: ${resolvedParams.id} - Duration: ${duration}ms`)
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    
    const duration = Date.now() - startTime
    console.log(`[${new Date().toISOString()}] [${requestId}] GET /api/products/${resolvedParams.id} - Success - Duration: ${duration}ms`)
    return NextResponse.json(product)
  } catch (error) {
    const duration = Date.now() - startTime
    console.error(`[${new Date().toISOString()}] [${requestId}] GET /api/products/[id] - Error - Duration: ${duration}ms`, {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    })
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  const requestId = crypto.randomUUID()
  const startTime = Date.now()
  
  try {
    const resolvedParams = params instanceof Promise ? await params : params
    console.log(`[${new Date().toISOString()}] [${requestId}] PATCH /api/products/${resolvedParams.id} - Request Started`)
    const body = await request.json()

    const updates: Partial<Omit<ProductDocument, '_id' | 'createdAt' | 'updatedAt'>> = {}

    if (typeof body.name === 'string') updates.name = body.name
    const price = toNumber(body.price)
    if (price !== undefined) updates.price = price

    if (typeof body.category === 'string') updates.category = body.category
    if (typeof body.description === 'string') updates.description = body.description

    const colors = toStringArray(body.colors)
    if (colors) updates.colors = colors

    const sizes = toStringArray(body.sizes)
    if (sizes) updates.sizes = sizes

    if (typeof body.image === 'string') updates.image = body.image

    const images = toStringArray(body.images)
    if (images) updates.images = images

    const rating = toNumber(body.rating)
    if (rating !== undefined) updates.rating = rating

    const reviews = toNumber(body.reviews)
    if (reviews !== undefined) updates.reviews = reviews

    const updated = await updateProduct(resolvedParams.id, updates)
    if (!updated) {
      const duration = Date.now() - startTime
      console.error(`[${new Date().toISOString()}] [${requestId}] Product not found for update - ID: ${resolvedParams.id} - Duration: ${duration}ms`)
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    const duration = Date.now() - startTime
    console.log(`[${new Date().toISOString()}] [${requestId}] PATCH /api/products/${resolvedParams.id} - Success - Duration: ${duration}ms`)
    return NextResponse.json(updated)
  } catch (error) {
    const duration = Date.now() - startTime
    console.error(`[${new Date().toISOString()}] [${requestId}] PATCH /api/products/[id] - Error - Duration: ${duration}ms`, {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    })
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  const requestId = crypto.randomUUID()
  const startTime = Date.now()
  
  try {
    const resolvedParams = params instanceof Promise ? await params : params
    console.log(`[${new Date().toISOString()}] [${requestId}] DELETE /api/products/${resolvedParams.id} - Request Started`)
    
    const deleted = await deleteProduct(resolvedParams.id)
    if (!deleted) {
      const duration = Date.now() - startTime
      console.error(`[${new Date().toISOString()}] [${requestId}] Product not found for deletion - ID: ${resolvedParams.id} - Duration: ${duration}ms`)
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    
    const duration = Date.now() - startTime
    console.log(`[${new Date().toISOString()}] [${requestId}] DELETE /api/products/${resolvedParams.id} - Success - Duration: ${duration}ms`)
    return NextResponse.json({ message: 'Product deleted successfully' })
  } catch (error) {
    const duration = Date.now() - startTime
    console.error(`[${new Date().toISOString()}] [${requestId}] DELETE /api/products/[id] - Error - Duration: ${duration}ms`, {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    })
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}

