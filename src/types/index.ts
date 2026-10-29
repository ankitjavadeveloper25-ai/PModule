// TypeScript definitions for Winter ARC Pro commercial platform

export type SubscriptionTierType = 'FREE' | 'PRO_MONTHLY' | 'PRO_YEARLY' | 'LIFETIME';

export interface Plan {
  id: string;
  tier: SubscriptionTierType;
  name: string;
  priceInr: number;
  amountPaise: number;
  currency: string;
  billingPeriod: string;
  durationDays: number;
  popular: boolean;
  description: string;
  features: string[];
  commercialNotice: string;
}

export interface User {
  userId: string;
  email: string;
  fullName: string;
  role: string;
  status?: string;
  createdAt?: string;
  avatarUrl?: string;
  authProvider?: string;
}

export interface UserSubscription {
  id?: string;
  tier: string;
  tierDisplayName: string;
  status: 'ACTIVE' | 'PAST_DUE' | 'CANCELLED' | 'REVOKED' | 'EXPIRED';
  provider: 'RAZORPAY' | 'STRIPE' | 'MANUAL' | 'COMPLIMENTARY';
  currentPeriodStart?: string;
  currentPeriodEnd?: string;
  daysRemaining: number;
  isLifetime: boolean;
  isPro: boolean;
}

export interface PaymentTransactionItem {
  id: string;
  provider: string;
  eventId?: string;
  eventType?: string;
  amountCents: number; // in paise or cents
  currency: string;
  status: string;
  createdAt: string;
}

export interface UserProfileResponse {
  userId: string;
  email: string;
  fullName: string;
  role: string;
  status: string;
  createdAt: string;
  startingDate: string;
  daysSinceStart: number;
  subscription: UserSubscription;
  payments?: PaymentTransactionItem[];
}

export interface EntitlementToken {
  schemaVersion: number;
  productId: string;
  tokenId: string;
  keyId: string;
  userId: string;
  email: string;
  tier: SubscriptionTierType;
  issuedAt: number;
  expiresAt: number;
  offlineGracePeriodSeconds: number;
  signature: string;
}

export interface RazorpayOrderCreatedResponse {
  orderId: string;
  internalOrderId: string;
  keyId: string;
  amount: number; // in paise
  currency: string;
  plan: string;
  tierDisplayName: string;
  userEmail: string;
  userFullName: string;
  checkoutUrl: string;
  provider: string;
}

export interface RazorpayVerifyPayload {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

export interface RazorpayVerifyResponse {
  verified: boolean;
  status: string;
  message: string;
  orderId: string;
  paymentId: string;
  tier?: string;
  tierDisplayName?: string;
  expiresAt?: string;
  token?: EntitlementToken;
  error?: string;
}

export interface DownloadReleaseInfo {
  productName: string;
  version: string;
  releaseDate: string;
  installerFilename: string;
  fileSizeBytes: number;
  fileSizeFormatted: string;
  sha256: string;
  architecture: string;
  operatingSystem: string;
  bundledJre: string;
  downloadUrl: string;
  githubReleaseUrl: string;
  status: string;
  systemRequirements: {
    os: string;
    processor: string;
    memory: string;
    storage: string;
    display: string;
  };
  releaseNotes: string[];
}
