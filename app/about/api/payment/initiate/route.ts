import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  const requestId = crypto.randomUUID()
  
  try {
    console.log(`[${new Date().toISOString()}] [${requestId}] Payment Initiation Request Started`)
    
    const body = await request.json()
    const {
      amount,
      payerName,
      payerEmail,
      payerMobile,
      clientTxnId,
      callbackUrl,
      orderItems,
    } = body

    console.log(`[${new Date().toISOString()}] [${requestId}] Payment Request Data:`, {
      amount,
      payerEmail,
      payerMobile: payerMobile?.substring(0, 3) + '***', // Mask phone for privacy
      clientTxnId,
      hasOrderItems: !!orderItems,
    })

    // Validate required fields
    if (!amount || !payerName || !payerEmail || !payerMobile || !clientTxnId) {
      console.error(`[${new Date().toISOString()}] [${requestId}] Validation Failed: Missing required fields`)
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get SabPaisa credentials from environment variables
    const clientCode = process.env.NEXT_PUBLIC_SABPAISA_CLIENT_CODE || 'PRAB96'
    const transUserName = process.env.NEXT_PUBLIC_SABPAISA_USERNAME || 'prabhash7049@gmail.com'
    const transUserPassword = process.env.NEXT_PUBLIC_SABPAISA_PASSWORD || 'PRAB96_SP24367'
    const authKey = process.env.NEXT_PUBLIC_SABPAISA_AUTH_KEY || 'SAUWc4kFIy7mTMdUay5iL91vFDYZLvGW91nPJSLMmqg='
    const authIV = process.env.NEXT_PUBLIC_SABPAISA_AUTH_IV || 'VFqeaLPIO0x3TnnE6rDLFqAtrNzVPtgivohLVI90VRWYIKi8834zyey5SIRMz8gc'
    // Always use PROD environment - no staging
    const env = 'PROD'
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

    // Prepare payment data
    const paymentData = {
      clientCode,
      transUserName,
      transUserPassword,
      authKey,
      authIV,
      payerName,
      payerEmail,
      payerMobile,
      amount: Number(amount), // Ensure amount is a number
      clientTxnId,
      channelId: 'npm',
      callbackUrl: callbackUrl || 'https://madhuea.store/about',
      env: 'PROD', // Always use production
      udf1: orderItems ? JSON.stringify(orderItems) : null,
      udf2: null,
      udf3: null,
      udf4: null,
      udf5: null,
      udf6: null,
      udf7: null,
      udf8: null,
      udf9: null,
      udf10: null,
      udf11: null,
      udf12: null,
      udf13: null,
      udf14: null,
      udf15: null,
      udf16: null,
      udf17: null,
      udf18: null,
      udf19: null,
      udf20: null,
      payerVpa: '',
      modeTransfer: '',
      byPassFlag: '',
      cardHolderName: '',
      pan: '',
      cardExpMonth: '',
      cardExpYear: '',
      cardType: '',
      cvv: '',
      browserDetails: '',
      bankId: '',
    }

    const duration = Date.now() - startTime
    console.log(`[${new Date().toISOString()}] [${requestId}] Payment Initiation Success - Duration: ${duration}ms`)
    
    return NextResponse.json({
      success: true,
      paymentData,
    })
  } catch (error) {
    const duration = Date.now() - startTime
    console.error(`[${new Date().toISOString()}] [${requestId}] Payment Initiation Error - Duration: ${duration}ms`, {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    })
    return NextResponse.json(
      { error: 'Failed to initiate payment' },
      { status: 500 }
    )
  }
}

