import type { ConfirmPaidOrderInput } from "../orders/confirm-paid-order";

export type CheckoutRequest = {
  amount: number;
  currency: "INR";
  receipt: string;
  customer: {
    email: string;
    phone?: string;
    name?: string;
  };
  metadata?: Record<string, string>;
};

export type CheckoutSession = {
  provider: string;
  providerOrderId: string;
  checkoutPayload: Record<string, unknown>;
};

export type VerifiedPayment = {
  eventId: string;
  eventType: string;
  paymentReference: string;
  order: Omit<ConfirmPaidOrderInput, "paymentProvider" | "paymentReference">;
};

export interface PaymentProvider {
  readonly name: string;
  createCheckout(request: CheckoutRequest): Promise<CheckoutSession>;
  verifyWebhook(rawBody: string, signature: string): Promise<VerifiedPayment>;
}
