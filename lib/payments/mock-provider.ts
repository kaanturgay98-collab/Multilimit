import { PaymentProvider } from "@/lib/payments/provider"

function genId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`
}

export const mockPaymentProvider: PaymentProvider = {
  async createPaymentSession({ successUrl, cancelUrl, failUrl, amount, currency }) {
    const sessionId = genId("mock_sess")
    const redirectUrl = `/checkout/pay?session=${encodeURIComponent(sessionId)}&amount=${encodeURIComponent(
      String(amount)
    )}&currency=${encodeURIComponent(currency)}&success=${encodeURIComponent(successUrl)}&cancel=${encodeURIComponent(
      cancelUrl
    )}&fail=${encodeURIComponent(failUrl)}`
    return { provider: "mock", sessionId, redirectUrl }
  },

  async verifyPayment({ sessionId }) {
    // Mock: if session exists, treat as paid after user clicks "Pay" on /checkout/pay
    return { ok: true, providerPaymentId: `mock_pay_${sessionId}` }
  },

  async handleWebhook() {
    // no-op for mock
  },
}

