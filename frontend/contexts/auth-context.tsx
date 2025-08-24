"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import api from '@/lib/api'; // <-- IMPORT OUR NEW API CLIENT

// User interface remains the same
interface User {
  id: string
  name: string
  email: string
  role: "customer" | "admin"
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isAuthenticated: boolean
  isAdmin: boolean
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string; // <-- Add password confirmation
}


const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // This effect will run when the app loads to check if the user is already logged in
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get('/user');
        setUser(data);
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      // First, get a CSRF cookie from Sanctum
      await api.get('/sanctum/csrf-cookie');
      
      // Now, attempt to log in
      const response = await api.post('/login', { email, password });
      
      // After login, fetch the user data
      const { data: userData } = await api.get('/user');
      setUser(userData);
      
      setIsLoading(false);
      return { success: true };
    } catch (error: any) {
      setIsLoading(false);
      return { success: false, error: error.response?.data?.message || "Login failed" };
    }
  }

  const register = async (data: RegisterData): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
        await api.get('/sanctum/csrf-cookie');
        await api.post('/register', data);

        // After successful registration, automatically log the user in
        const loginResult = await login(data.email, data.password);
        return loginResult;
    } catch (error: any) {
        setIsLoading(false);
        const errorMessages = error.response?.data;
        // Format validation errors nicely
        if (errorMessages && typeof errorMessages === 'object') {
            return { success: false, error: Object.values(errorMessages).flat().join(' ') };
        }
        return { success: false, error: "Registration failed" };
    }
  }

  const logout = async () => {
    try {
        await api.post('/logout');
    } catch (error) {
        console.error("Logout failed", error);
    } finally {
        setUser(null);
    }
  }

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}