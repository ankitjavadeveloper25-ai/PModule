import { request } from './apiClient';
import { Plan } from '../types';

export const VERIFIED_FALLBACK_PLANS: Plan[] = [
  {
    id: 'FREE',
    tier: 'FREE',
    name: 'Free Edition',
    priceInr: 0,
    amountPaise: 0,
    currency: 'INR',
    billingPeriod: 'Forever Free',
    durationDays: 0,
    popular: false,
    description: 'Core habit tracking and basic consistency calendar for self-driven individuals.',
    features: [
      'Up to 5 Active Habits',
      'Daily Progress Checklist',
      'Basic Consistency Heatmap',
      '100% Offline Local SQLite Storage',
      'Zero Cloud Telemetry on Habits',
    ],
    commercialNotice: 'Free forever with zero credit card required.',
  },
  {
    id: 'PRO_PLAN_A',
    tier: 'PRO_MONTHLY',
    name: 'Pro Plan A',
    priceInr: 50,
    amountPaise: 5000,
    currency: 'INR',
    billingPeriod: '30-Day Sprint',
    durationDays: 30,
    popular: false,
    description: 'Entry-level Pro discipline package to kickstart your Winter ARC transformation.',
    features: [
      'Unlimited Habits & Routines',
      'Full 90-Day Challenge Matrix',
      'Pomodoro Focus Timer & Audio Alerts',
      'Consistency Heatmap & Analytics',
      '14-Day Offline Grace Period',
      'Cryptographic Ed25519 Local Verification',
      'Local SQLite Backup & Restore',
    ],
    commercialNotice: 'Note: Billing duration is configurable (default: 30 days) pending final commercial decision.',
  },
  {
    id: 'PRO_PLAN_B',
    tier: 'PRO_YEARLY',
    name: 'Pro Plan B',
    priceInr: 100,
    amountPaise: 10000,
    currency: 'INR',
    billingPeriod: 'Full 90-Day Cycle',
    durationDays: 90,
    popular: true,
    description: 'Complete power package including the 90-day challenge and technical placement roadmap.',
    features: [
      'Everything in Pro Plan A',
      'Technical Interview Placement Roadmap',
      'DSA Problem Tracker & LeetCode Log',
      'Company Target & Interview Prep Planner',
      'Deep Work Analytics & Timeline Insights',
      'Full 90-Day Challenge Cycle Coverage',
      'Priority Roadmap Voting & Direct Support',
    ],
    commercialNotice: 'Note: Billing duration is configurable (default: 90 days) pending final commercial decision.',
  },
];

export const planService = {
  async getPlans(): Promise<{ plans: Plan[]; isFallback?: boolean }> {
    try {
      const data = await request<{ plans: Plan[] }>('/api/plans');
      if (data && Array.isArray(data.plans) && data.plans.length > 0) {
        return { plans: data.plans, isFallback: false };
      }
      return { plans: VERIFIED_FALLBACK_PLANS, isFallback: true };
    } catch (err) {
      console.warn('Backend plan catalog unavailable, using verified static catalog:', err);
      return { plans: VERIFIED_FALLBACK_PLANS, isFallback: true };
    }
  },
};
