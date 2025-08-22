"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useAnalytics } from "@/hooks/use-analytics"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image_url?: string
  part_number: string
  stock_quantity: number
}

interface CartContextType {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  addItem: (product: Omit<CartItem, 'quantity'>, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  isInCart: (productId: string) => boolean
  getItemQuantity: (productId: string) => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: any }) {
  const [items, setItems] = useState<CartItem[]>([])
  const { logAddToCart, logRemoveFromCart } = useAnalytics()

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('autoparts_cart')
      if (savedCart) {
        try {
          setItems(JSON.parse(savedCart))
        } catch (error) {
          console.error('Error loading cart from localStorage:', error)
          localStorage.removeItem('autoparts_cart')
        }
      }
    }
  }, [])

  // Save cart to localStorage whenever items change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('autoparts_cart', JSON.stringify(items))
    }
  }, [items])

  const addItem = (product: Omit<CartItem, 'quantity'>, quantity = 1) => {
    setItems((prevItems: CartItem[]) => {
      const existingItem = prevItems.find((item: CartItem) => item.id === product.id)
      
      if (existingItem) {
        const newQuantity = Math.min(existingItem.quantity + quantity, product.stock_quantity)
        logAddToCart(product.id, quantity, product.price)
        
        return prevItems.map((item: CartItem) =>
          item.id === product.id
            ? { ...item, quantity: newQuantity }
            : item
        )
      } else {
        const newQuantity = Math.min(quantity, product.stock_quantity)
        logAddToCart(product.id, newQuantity, product.price)
        
        return [...prevItems, { ...product, quantity: newQuantity }]
      }
    })
  }

  const removeItem = (productId: string) => {
    setItems((prevItems: CartItem[]) => {
      const item = prevItems.find((item: CartItem) => item.id === productId)
      if (item) {
        logRemoveFromCart(productId, item.quantity)
      }
      return prevItems.filter((item: CartItem) => item.id !== productId)
    })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }

    setItems((prevItems: CartItem[]) =>
      prevItems.map((item: CartItem) => {
        if (item.id === productId) {
          const newQuantity = Math.min(quantity, item.stock_quantity)
          const quantityDiff = newQuantity - item.quantity
          
          if (quantityDiff > 0) {
            logAddToCart(productId, quantityDiff, item.price)
          } else if (quantityDiff < 0) {
            logRemoveFromCart(productId, Math.abs(quantityDiff))
          }
          
          return { ...item, quantity: newQuantity }
        }
        return item
      })
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const isInCart = (productId: string) => {
    return items.some((item: CartItem) => item.id === productId)
  }

  const getItemQuantity = (productId: string) => {
    const item = items.find((item: CartItem) => item.id === productId)
    return item ? item.quantity : 0
  }

  const totalItems = items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0)

  const value: CartContextType = {
    items,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
