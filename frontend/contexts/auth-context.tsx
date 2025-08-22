"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { apiService } from "@/lib/api"

interface User {
  id: string
  username: string
  full_name: string
  email: string
  phone?: string
  address?: string
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
  full_name: string
  username: string
  email: string
  password: string
  password_confirmation: string
  phone?: string
  address?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem("auth_token")
      if (token) {
        try {
          const response = await apiService.getCurrentUser()
          if (response.user) {
            setUser(response.user)
          } else {
            // Token is invalid, remove it
            localStorage.removeItem("auth_token")
            localStorage.removeItem("autoparts_user")
          }
        } catch (error) {
          // Token is invalid, remove it
          localStorage.removeItem("auth_token")
          localStorage.removeItem("autoparts_user")
        }
      }
      setIsLoading(false)
    }

    checkAuthStatus()
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true)

    try {
      const response = await apiService.login(email, password)
      
      if (response.user && response.token) {
        setUser(response.user)
        localStorage.setItem("auth_token", response.token)
        localStorage.setItem("autoparts_user", JSON.stringify(response.user))
        setIsLoading(false)
        return { success: true }
      } else {
        setIsLoading(false)
        return { success: false, error: response.message || "Login failed" }
      }
    } catch (error: any) {
      setIsLoading(false)
      return { success: false, error: error.message || "Login failed" }
    }
  }

  const register = async (data: RegisterData): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true)

    try {
      const response = await apiService.register(data)
      
      if (response.user && response.token) {
        setUser(response.user)
        localStorage.setItem("auth_token", response.token)
        localStorage.setItem("autoparts_user", JSON.stringify(response.user))
        setIsLoading(false)
        return { success: true }
      } else {
        setIsLoading(false)
        return { success: false, error: response.message || "Registration failed" }
      }
    } catch (error: any) {
      setIsLoading(false)
      return { success: false, error: error.message || "Registration failed" }
    }
  }

  const logout = async () => {
    try {
      await apiService.logout()
    } catch (error) {
      // Even if logout fails on server, clear local data
      console.error("Logout error:", error)
    } finally {
      setUser(null)
      localStorage.removeItem("auth_token")
      localStorage.removeItem("autoparts_user")
    }
  }

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
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
