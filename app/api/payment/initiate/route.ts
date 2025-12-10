import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
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

    // Validate required fields
    if (!amount || !payerName || !payerEmail || !payerMobile || !clientTxnId) {
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
    const env = process.env.NEXT_PUBLIC_SABPAISA_ENV || 'STAG'
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
      amount: Math.round(amount * 100) / 100, // Ensure 2 decimal places
      amountType: 'INR',
      clientTxnId,
      channelId: 'npm',
      callbackUrl: callbackUrl || `${baseUrl}/payment/response`,
      env,
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

    return NextResponse.json({
      success: true,
      paymentData,
    })
  } catch (error) {
    console.error('Error initiating payment:', error)
    return NextResponse.json(
      { error: 'Failed to initiate payment' },
      { status: 500 }
    )
  }
}

