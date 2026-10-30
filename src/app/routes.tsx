import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { RootLayout } from '../layouts/RootLayout';
import { HomePage } from '../pages/HomePage';
import { FeaturesPage } from '../pages/FeaturesPage';
import { PricingPage } from '../pages/PricingPage';
import { DownloadPage } from '../pages/DownloadPage';
import { GuidePage } from '../pages/GuidePage';
import { FaqPage } from '../pages/FaqPage';
import { ContactPage } from '../pages/ContactPage';
import { PrivacyPage } from '../pages/PrivacyPage';
import { TermsPage } from '../pages/TermsPage';
import { RefundPolicyPage } from '../pages/RefundPolicyPage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { AccountPage } from '../pages/AccountPage';
import { CheckoutSuccessPage } from '../pages/checkout/CheckoutSuccessPage';
import { CheckoutPendingPage } from '../pages/checkout/CheckoutPendingPage';
import { CheckoutCancelPage } from '../pages/checkout/CheckoutCancelPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/download" element={<DownloadPage />} />
        <Route path="/guide" element={<GuidePage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/refund-policy" element={<RefundPolicyPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/profile" element={<AccountPage />} />
        <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
        <Route path="/checkout/pending" element={<CheckoutPendingPage />} />
        <Route path="/checkout/cancel" element={<CheckoutCancelPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};
