'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { Navigation } from '@/components/admin/Navigation';
import { LoginForm } from '@/components/admin/LoginForm';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Login failed');
    }

    const data = await res.json();
    localStorage.setItem('admin-token', data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem('admin-token');
    setUser(null);
    router.push('/admin');
  };

  useEffect(() => {
    const token = localStorage.getItem('admin-token');
    if (token) {
      // Verify token by calling a protected endpoint
      fetch('/api/admin/verify', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => {
          if (data.user) {
            setUser(data.user);
          } else {
            localStorage.removeItem('admin-token');
          }
        })
        .catch(() => {
          localStorage.removeItem('admin-token');
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <AuthContext.Provider value={{ user, login, logout, isLoading }}>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <LoginForm />
        </div>
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </AuthContext.Provider>
  );
}
