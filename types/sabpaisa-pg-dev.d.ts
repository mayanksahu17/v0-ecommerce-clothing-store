declare module 'sabpaisa-pg-dev' {
  export interface PaymentFormData {
    clientCode: string
    transUserName: string
    transUserPassword: string
    authKey: string
    authIV: string
    payerName: string
    payerEmail: string
    payerMobile: string
    amount: number
    clientTxnId: string
    channelId: string
    callbackUrl: string
    env: 'PROD' | 'STAG' | 'UAT'
    udf1?: string | null
    udf2?: string | null
    udf3?: string | null
    udf4?: string | null
    udf5?: string | null
    udf6?: string | null
    udf7?: string | null
    udf8?: string | null
    udf9?: string | null
    udf10?: string | null
    udf11?: string | null
    udf12?: string | null
    udf13?: string | null
    udf14?: string | null
    udf15?: string | null
    udf16?: string | null
    udf17?: string | null
    udf18?: string | null
    udf19?: string | null
    udf20?: string | null
    payerVpa?: string
    modeTransfer?: string
    byPassFlag?: string
    cardHolderName?: string
    pan?: string
    cardExpMonth?: string
    cardExpYear?: string
    cardType?: string
    cvv?: string
    browserDetails?: string
    bankId?: string
  }

  export function submitPaymentForm(data: PaymentFormData): Promise<void>
  export function parsePaymentResponse(authKey: string, authIV: string): Promise<any>
}

