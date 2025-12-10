import { NextRequest, NextResponse } from 'next/server'
import { parsePaymentResponse } from 'sabpaisa-pg-dev'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const responseData: Record<string, any> = {}
    
    // Convert FormData to object
    formData.forEach((value, key) => {
      responseData[key] = value
    })

    const authKey = process.env.NEXT_PUBLIC_SABPAISA_AUTH_KEY || 'SAUWc4kFIy7mTMdUay5iL91vFDYZLvGW91nPJSLMmqg='
    const authIV = process.env.NEXT_PUBLIC_SABPAISA_AUTH_IV || 'VFqeaLPIO0x3TnnE6rDLFqAtrNzVPtgivohLVI90VRWYIKi8834zyey5SIRMz8gc'

    // Parse the payment response
    const parsedResponse = await parsePaymentResponse(authKey, authIV)

    return NextResponse.json({
      success: true,
      response: parsedResponse,
      rawResponse: responseData,
    })
  } catch (error) {
    console.error('Error processing payment response:', error)
    return NextResponse.json(
      { error: 'Failed to process payment response' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const responseData: Record<string, any> = {}
    
    // Convert URL params to object
    searchParams.forEach((value, key) => {
      responseData[key] = value
    })

    const authKey = process.env.NEXT_PUBLIC_SABPAISA_AUTH_KEY || 'SAUWc4kFIy7mTMdUay5iL91vFDYZLvGW91nPJSLMmqg='
    const authIV = process.env.NEXT_PUBLIC_SABPAISA_AUTH_IV || 'VFqeaLPIO0x3TnnE6rDLFqAtrNzVPtgivohLVI90VRWYIKi8834zyey5SIRMz8gc'

    // Parse the payment response
    const parsedResponse = await parsePaymentResponse(authKey, authIV)

    return NextResponse.json({
      success: true,
      response: parsedResponse,
      rawResponse: responseData,
    })
  } catch (error) {
    console.error('Error processing payment response:', error)
    return NextResponse.json(
      { error: 'Failed to process payment response' },
      { status: 500 }
    )
  }
}

