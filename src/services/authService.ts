import { request, setStoredAuth, clearStoredAuth, getStoredUser } from './apiClient';
import { User, UserProfileResponse, EntitlementToken } from '../types';

export const authService = {
  async register(email: string, password: string, fullName: string): Promise<{ token: string; user: User }> {
    const data = await request<{
      token: string;
      userId: string;
      email: string;
      fullName: string;
      role: string;
    }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, fullName }),
    });

    const user: User = {
      userId: data.userId,
      email: data.email,
      fullName: data.fullName,
      role: data.role,
    };

    setStoredAuth(data.token, user);
    return { token: data.token, user };
  },

  async login(email: string, password: string): Promise<{ token: string; user: User }> {
    const data = await request<{
      token: string;
      userId: string;
      email: string;
      fullName: string;
      role: string;
    }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    const user: User = {
      userId: data.userId,
      email: data.email,
      fullName: data.fullName,
      role: data.role,
    };

    setStoredAuth(data.token, user);
    return { token: data.token, user };
  },

  async loginWithGoogle(credential: string): Promise<{ token: string; user: User; isNewUser?: boolean }> {
    const data = await request<{
      token: string;
      userId: string;
      email: string;
      fullName: string;
      role: string;
      status?: string;
      avatarUrl?: string;
      isNewUser?: boolean;
    }>('/api/auth/google', {
      method: 'POST',
      body: JSON.stringify({ credential }),
    });

    const user: User = {
      userId: data.userId,
      email: data.email,
      fullName: data.fullName,
      role: data.role,
      status: data.status,
      avatarUrl: data.avatarUrl,
      authProvider: 'GOOGLE',
    };

    setStoredAuth(data.token, user);
    return { token: data.token, user, isNewUser: data.isNewUser };
  },

  logout(): void {
    clearStoredAuth();
  },

  getCurrentUser(): User | null {
    return getStoredUser();
  },

  async getProfile(): Promise<UserProfileResponse> {
    return request<UserProfileResponse>('/api/profile', {
      method: 'GET',
      requiresAuth: true,
    });
  },

  async getSignedEntitlement(): Promise<EntitlementToken> {
    return request<EntitlementToken>('/api/entitlements/verify', {
      method: 'GET',
      requiresAuth: true,
    });
  },
};
