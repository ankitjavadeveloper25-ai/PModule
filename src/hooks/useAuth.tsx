import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserProfileResponse } from '../types';
import { authService } from '../services/authService';
import { getStoredToken } from '../services/apiClient';

interface AuthContextType {
  user: User | null;
  profile: UserProfileResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName: string) => Promise<void>;
  loginWithGoogle: (credential: string) => Promise<{ isNewUser?: boolean }>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(authService.getCurrentUser());
  const [profile, setProfile] = useState<UserProfileResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchProfile = async () => {
    if (!getStoredToken()) {
      setUser(null);
      setProfile(null);
      setIsLoading(false);
      return;
    }
    try {
      const data = await authService.getProfile();
      setProfile(data);
      setUser({
        userId: data.userId,
        email: data.email,
        fullName: data.fullName,
        role: data.role,
        status: data.status,
      });
    } catch (err) {
      console.warn('Failed to load profile on mount:', err);
      // If token expired (401), clear local auth
      if ((err as any)?.status === 401) {
        authService.logout();
        setUser(null);
        setProfile(null);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await authService.login(email, password);
    setUser(res.user);
    await fetchProfile();
  };

  const register = async (email: string, password: string, fullName: string) => {
    const res = await authService.register(email, password, fullName);
    setUser(res.user);
    await fetchProfile();
  };

  const loginWithGoogle = async (credential: string) => {
    const res = await authService.loginWithGoogle(credential);
    setUser(res.user);
    await fetchProfile();
    return { isNewUser: res.isNewUser };
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isAuthenticated: !!user && !!getStoredToken(),
        isLoading,
        login,
        register,
        loginWithGoogle,
        logout,
        refreshProfile: fetchProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
