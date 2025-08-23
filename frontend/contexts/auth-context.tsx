"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

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
  name: string
  username: string
  email: string
  password: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("autoparts_user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        localStorage.removeItem("autoparts_user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock authentication logic
    if (email === "admin@autoparts.tz" && password === "admin123") {
      const adminUser: User = {
        id: "admin-1",
        name: "Admin User",
        email: "admin@autoparts.tz",
        role: "admin",
      }
      setUser(adminUser)
      localStorage.setItem("autoparts_user", JSON.stringify(adminUser))
      setIsLoading(false)
      return { success: true }
    } else if (email && password) {
      // Mock customer login
      const customerUser: User = {
        id: "customer-1",
        name: "John Doe",
        email: email,
        role: "customer",
      }
      setUser(customerUser)
      localStorage.setItem("autoparts_user", JSON.stringify(customerUser))
      setIsLoading(false)
      return { success: true }
    } else {
      setIsLoading(false)
      return { success: false, error: "Invalid email or password" }
    }
  }

  const register = async (data: RegisterData): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock registration logic
    if (data.email && data.password && data.name) {
      const newUser: User = {
        id: `customer-${Date.now()}`,
        name: data.name,
        email: data.email,
        role: "customer",
      }
      setUser(newUser)
      localStorage.setItem("autoparts_user", JSON.stringify(newUser))
      setIsLoading(false)
      return { success: true }
    } else {
      setIsLoading(false)
      return { success: false, error: "Please fill in all required fields" }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("autoparts_user")
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
