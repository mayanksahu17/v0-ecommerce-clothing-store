import { NextRequest, NextResponse } from 'next/server'
import { parsePaymentResponse } from 'sabpaisa-pg-dev'

export async function POST(request: NextRequest) {
  const requestId = crypto.randomUUID()
  const startTime = Date.now()
  
  try {
    console.log(`[${new Date().toISOString()}] [${requestId}] POST /api/payment/response - Request Started`)
    const formData = await request.formData()
    const responseData: Record<string, any> = {}
    
    // Convert FormData to object
    formData.forEach((value, key) => {
      responseData[key] = value
    })

    console.log(`[${new Date().toISOString()}] [${requestId}] Payment response received with keys:`, Object.keys(responseData))

    const authKey = process.env.NEXT_PUBLIC_SABPAISA_AUTH_KEY || 'SAUWc4kFIy7mTMdUay5iL91vFDYZLvGW91nPJSLMmqg='
    const authIV = process.env.NEXT_PUBLIC_SABPAISA_AUTH_IV || 'VFqeaLPIO0x3TnnE6rDLFqAtrNzVPtgivohLVI90VRWYIKi8834zyey5SIRMz8gc'

    // Parse the payment response
    const parsedResponse = await parsePaymentResponse(authKey, authIV)
    
    const duration = Date.now() - startTime
    console.log(`[${new Date().toISOString()}] [${requestId}] POST /api/payment/response - Success - Status: ${parsedResponse?.txnStatus} - Duration: ${duration}ms`)

    return NextResponse.json({
      success: true,
      response: parsedResponse,
      rawResponse: responseData,
    })
  } catch (error) {
    const duration = Date.now() - startTime
    console.error(`[${new Date().toISOString()}] [${requestId}] POST /api/payment/response - Error - Duration: ${duration}ms`, {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    })
    return NextResponse.json(
      { error: 'Failed to process payment response' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const requestId = crypto.randomUUID()
  const startTime = Date.now()
  
  try {
    console.log(`[${new Date().toISOString()}] [${requestId}] GET /api/payment/response - Request Started`)
    const searchParams = request.nextUrl.searchParams
    const responseData: Record<string, any> = {}
    
    // Convert URL params to object
    searchParams.forEach((value, key) => {
      responseData[key] = value
    })

    console.log(`[${new Date().toISOString()}] [${requestId}] Payment response received via GET with keys:`, Object.keys(responseData))

    const authKey = process.env.NEXT_PUBLIC_SABPAISA_AUTH_KEY || 'SAUWc4kFIy7mTMdUay5iL91vFDYZLvGW91nPJSLMmqg='
    const authIV = process.env.NEXT_PUBLIC_SABPAISA_AUTH_IV || 'VFqeaLPIO0x3TnnE6rDLFqAtrNzVPtgivohLVI90VRWYIKi8834zyey5SIRMz8gc'

    // Parse the payment response
    const parsedResponse = await parsePaymentResponse(authKey, authIV)
    
    const duration = Date.now() - startTime
    console.log(`[${new Date().toISOString()}] [${requestId}] GET /api/payment/response - Success - Status: ${parsedResponse?.txnStatus} - Duration: ${duration}ms`)

    return NextResponse.json({
      success: true,
      response: parsedResponse,
      rawResponse: responseData,
    })
  } catch (error) {
    const duration = Date.now() - startTime
    console.error(`[${new Date().toISOString()}] [${requestId}] GET /api/payment/response - Error - Duration: ${duration}ms`, {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    })
    return NextResponse.json(
      { error: 'Failed to process payment response' },
      { status: 500 }
    )
  }
}

