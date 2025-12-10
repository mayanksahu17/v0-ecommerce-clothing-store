import { NextRequest, NextResponse } from 'next/server'
import { getProducts, createProduct } from '@/lib/models/Product'

export async function GET() {
  try {
    const products = await getProducts()
    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
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
    return NextResponse.json({ id: productId, message: 'Product created successfully' })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}

