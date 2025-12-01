import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
})

export async function uploadToS3(file: File, fileName: string): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer())
  const bucketName = process.env.AWS_BUCKET_NAME || 'lodgezify'
  
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: `products/${fileName}`,
    Body: buffer,
    ContentType: file.type,
  })

  await s3Client.send(command)
  
  // Return the S3 URL
  return `https://${bucketName}.s3.${process.env.AWS_REGION || 'us-east-1'}.amazonaws.com/products/${fileName}`
}

export function generateFileName(originalName: string): string {
  const timestamp = Date.now()
  const randomString = Math.random().toString(36).substring(2, 15)
  const extension = originalName.split('.').pop()
  return `${timestamp}-${randomString}.${extension}`
}

