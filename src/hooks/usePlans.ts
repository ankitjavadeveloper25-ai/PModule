import { useState, useEffect } from 'react';
import { Plan } from '../types';
import { planService, VERIFIED_FALLBACK_PLANS } from '../services/planService';

export function usePlans() {
  const [plans, setPlans] = useState<Plan[]>(VERIFIED_FALLBACK_PLANS);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isFallback, setIsFallback] = useState<boolean>(false);

  const loadPlans = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await planService.getPlans();
      setPlans(res.plans);
      setIsFallback(!!res.isFallback);
    } catch (err: any) {
      setError(err?.message || 'Failed to load subscription plans');
      setPlans(VERIFIED_FALLBACK_PLANS);
      setIsFallback(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlans();
  }, []);

  return { plans, loading, error, isFallback, retry: loadPlans };
}
