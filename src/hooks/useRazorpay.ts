import { useState, useCallback } from 'react';
import { paymentService } from '../services/paymentService';
import { RazorpayVerifyPayload, RazorpayVerifyResponse } from '../types';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface OpenCheckoutOptions {
  planId: string;
  userEmail?: string;
  userName?: string;
  onSuccess: (res: RazorpayVerifyResponse) => void;
  onCancel?: () => void;
  onError: (errMsg: string) => void;
}

export function useRazorpay() {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const openCheckout = useCallback(async ({
    planId,
    userEmail,
    userName,
    onSuccess,
    onCancel,
    onError,
  }: OpenCheckoutOptions) => {
    setIsProcessing(true);

    try {
      // 1. Create order on Spring Boot backend
      const order = await paymentService.createRazorpayOrder(planId, 'INR');

      if (!order || !order.orderId) {
        throw new Error('Failed to generate secure Razorpay order from backend.');
      }

      // 2. Ensure Razorpay Checkout SDK is available
      if (typeof window.Razorpay === 'undefined') {
        throw new Error('Razorpay Checkout SDK is not loaded. Please verify your internet connection.');
      }

      // 3. Configure Razorpay modal options
      const options = {
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: 'Winter ARC Pro',
        description: `${order.tierDisplayName} Subscription`,
        image: '/icons/winterarc.png',
        order_id: order.orderId,
        prefill: {
          name: userName || order.userFullName || '',
          email: userEmail || order.userEmail || '',
        },
        theme: {
          color: '#38BDF8', // Electric Ice Blue brand color
          backdrop_color: 'rgba(9, 13, 22, 0.85)',
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
            if (onCancel) onCancel();
          },
        },
        handler: async (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => {
          try {
            // 4. Client-side callback must NEVER activate Pro directly.
            // Send payload to Spring Boot for HMAC-SHA256 signature verification & API check.
            const verifyPayload: RazorpayVerifyPayload = {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            };

            const verifyResult = await paymentService.verifyRazorpayPayment(verifyPayload);

            if (verifyResult.verified) {
              onSuccess(verifyResult);
            } else {
              onError(verifyResult.message || 'Payment verification failed on the server.');
            }
          } catch (verifyErr: any) {
            onError(verifyErr?.message || 'Server verification failed. Please contact support.');
          } finally {
            setIsProcessing(false);
          }
        },
      };

      const rzpInstance = new window.Razorpay(options);
      rzpInstance.on('payment.failed', function (resp: any) {
        const desc = resp.error?.description || 'Transaction was declined by bank or gateway.';
        onError(desc);
        setIsProcessing(false);
      });

      rzpInstance.open();
    } catch (err: any) {
      setIsProcessing(false);
      onError(err?.message || 'Checkout initiation failed.');
    }
  }, []);

  return { openCheckout, isProcessing };
}
