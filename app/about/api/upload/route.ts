import { NextRequest, NextResponse } from 'next/server'
import { uploadToS3, generateFileName } from '@/lib/s3'

export async function POST(request: NextRequest) {
  const requestId = crypto.randomUUID()
  const startTime = Date.now()
  
  try {
    console.log(`[${new Date().toISOString()}] [${requestId}] POST /api/upload - Request Started`)
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      console.error(`[${new Date().toISOString()}] [${requestId}] No file provided in upload request`)
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    console.log(`[${new Date().toISOString()}] [${requestId}] Uploading file: ${file.name} (${file.size} bytes)`)
    const fileName = generateFileName(file.name)
    const url = await uploadToS3(file, fileName)

    const duration = Date.now() - startTime
    console.log(`[${new Date().toISOString()}] [${requestId}] POST /api/upload - Success: ${fileName} - Duration: ${duration}ms`)
    return NextResponse.json({ url, fileName })
  } catch (error) {
    const duration = Date.now() - startTime
    console.error(`[${new Date().toISOString()}] [${requestId}] POST /api/upload - Error - Duration: ${duration}ms`, {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    })
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}

