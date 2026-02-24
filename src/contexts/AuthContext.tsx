import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || 'admin@gmail.com';
      const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || '123456';
      const superAdminEmail = import.meta.env.VITE_SUPER_ADMIN_EMAIL || 'superadmin@gmail.com';
      const superAdminPassword = import.meta.env.VITE_SUPER_ADMIN_PASSWORD || 'superpassword123';

      const isSuperAdmin = email === superAdminEmail && password === superAdminPassword;
      const isAdmin = (email === adminEmail && password === adminPassword) || isSuperAdmin;

      // Mock successful login
      const mockUser: User = {
        id: isSuperAdmin ? 'superadmin' : (isAdmin ? 'admin' : '1'),
        email,
        name: email.split('@')[0],
        isAuthenticated: true,
        role: isSuperAdmin ? 'superadmin' : (isAdmin ? 'admin' : 'user')
      };

      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return true;
    } catch (error) {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock successful signup
      const mockUser: User = {
        id: '1',
        email,
        name,
        isAuthenticated: true,
        role: 'user'
      };

      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return true;
    } catch (error) {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};