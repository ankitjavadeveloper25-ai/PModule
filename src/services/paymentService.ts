import { request } from './apiClient';
import {
  RazorpayOrderCreatedResponse,
  RazorpayVerifyPayload,
  RazorpayVerifyResponse,
} from '../types';

export const paymentService = {
  /**
   * Calls the Spring Boot backend to validate plan, derive server-side price, and create a genuine Razorpay Order.
   */
  async createRazorpayOrder(planId: string, currency: string = 'INR'): Promise<RazorpayOrderCreatedResponse> {
    const idempotencyKey = `idem_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    return request<RazorpayOrderCreatedResponse>('/api/checkout/razorpay/create-order', {
      method: 'POST',
      requiresAuth: true,
      body: JSON.stringify({
        plan: planId,
        currency,
        idempotencyKey,
      }),
    });
  },

  /**
   * Sends the Razorpay checkout callback (orderId, paymentId, signature) to the backend
   * for constant-time HMAC-SHA256 cryptographic verification and upstream API status check.
   */
  async verifyRazorpayPayment(payload: RazorpayVerifyPayload): Promise<RazorpayVerifyResponse> {
    return request<RazorpayVerifyResponse>('/api/checkout/razorpay/verify', {
      method: 'POST',
      requiresAuth: true,
      body: JSON.stringify(payload),
    });
  },
};
