// Environment configuration with production-safe fallbacks

export const config = {
  // Always default to the live Render backend if VITE_API_BASE_URL is not explicitly specified
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'https://springboot-igj8.onrender.com',
  razorpayKeyId: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_placeholder_key_id',
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
  downloadUrl: import.meta.env.VITE_DOWNLOAD_URL || '/downloads/Winter-ARC-Pro-1.0.1.msi',
  githubReleaseUrl: import.meta.env.VITE_GITHUB_RELEASE_URL || 'https://github.com/winterarc/winter-arc-desktop/releases',
  contactEmail: import.meta.env.VITE_CONTACT_EMAIL || 'support@winterarc.pro',
  appVersion: import.meta.env.VITE_APP_VERSION || '1.0.1',
};
