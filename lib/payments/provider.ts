export type PaymentSession = {
  provider: string
  sessionId: string
  redirectUrl: string
}

export type VerifyResult = { ok: boolean; providerPaymentId?: string; raw?: unknown }

export interface PaymentProvider {
  createPaymentSession(args: {
    orderId: string
    amount: number
    currency: string
    successUrl: string
    cancelUrl: string
    failUrl: string
  }): Promise<PaymentSession>

  verifyPayment(args: { sessionId: string }): Promise<VerifyResult>

  handleWebhook(args: { rawBody: string; signature?: string | null }): Promise<void>
}

