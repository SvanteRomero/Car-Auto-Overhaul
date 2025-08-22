"use client"

import { useCallback } from 'react'
import { apiService } from '@/lib/api'

interface EventData {
  event_type: string
  metadata?: Record<string, any>
  session_id?: string
}

export function useAnalytics() {
  const logEvent = useCallback(async (eventData: EventData) => {
    try {
      // Generate session ID if not provided
      if (!eventData.session_id) {
        eventData.session_id = getOrCreateSessionId()
      }

      await apiService.logEvent(eventData)
    } catch (error) {
      console.error('Failed to log analytics event:', error)
    }
  }, [])

  const logPageView = useCallback((page: string, additionalData?: Record<string, any>) => {
    logEvent({
      event_type: 'page_view',
      metadata: {
        page,
        timestamp: new Date().toISOString(),
        ...additionalData
      }
    })
  }, [logEvent])

  const logProductView = useCallback((productId: string, productName?: string, additionalData?: Record<string, any>) => {
    logEvent({
      event_type: 'product_view',
      metadata: {
        product_id: productId,
        product_name: productName,
        timestamp: new Date().toISOString(),
        ...additionalData
      }
    })
  }, [logEvent])

  const logAddToCart = useCallback((productId: string, quantity: number, price?: number, additionalData?: Record<string, any>) => {
    logEvent({
      event_type: 'add_to_cart',
      metadata: {
        product_id: productId,
        quantity,
        price,
        timestamp: new Date().toISOString(),
        ...additionalData
      }
    })
  }, [logEvent])

  const logRemoveFromCart = useCallback((productId: string, quantity: number, additionalData?: Record<string, any>) => {
    logEvent({
      event_type: 'remove_from_cart',
      metadata: {
        product_id: productId,
        quantity,
        timestamp: new Date().toISOString(),
        ...additionalData
      }
    })
  }, [logEvent])

  const logCheckoutStart = useCallback((cartValue: number, itemCount: number, additionalData?: Record<string, any>) => {
    logEvent({
      event_type: 'checkout_start',
      metadata: {
        cart_value: cartValue,
        item_count: itemCount,
        timestamp: new Date().toISOString(),
        ...additionalData
      }
    })
  }, [logEvent])

  const logOrderComplete = useCallback((orderId: string, orderValue: number, itemCount: number, additionalData?: Record<string, any>) => {
    logEvent({
      event_type: 'order_complete',
      metadata: {
        order_id: orderId,
        order_value: orderValue,
        item_count: itemCount,
        timestamp: new Date().toISOString(),
        ...additionalData
      }
    })
  }, [logEvent])

  const logSearch = useCallback((searchTerm: string, resultsCount?: number, additionalData?: Record<string, any>) => {
    logEvent({
      event_type: 'search',
      metadata: {
        search_term: searchTerm,
        results_count: resultsCount,
        timestamp: new Date().toISOString(),
        ...additionalData
      }
    })
  }, [logEvent])

  const logProductLike = useCallback((productId: string, liked: boolean, additionalData?: Record<string, any>) => {
    logEvent({
      event_type: liked ? 'product_like' : 'product_unlike',
      metadata: {
        product_id: productId,
        timestamp: new Date().toISOString(),
        ...additionalData
      }
    })
  }, [logEvent])

  const logCategoryView = useCallback((categoryId: string, categoryName?: string, additionalData?: Record<string, any>) => {
    logEvent({
      event_type: 'category_view',
      metadata: {
        category_id: categoryId,
        category_name: categoryName,
        timestamp: new Date().toISOString(),
        ...additionalData
      }
    })
  }, [logEvent])

  const logCarMakeView = useCallback((makeId: string, makeName?: string, additionalData?: Record<string, any>) => {
    logEvent({
      event_type: 'car_make_view',
      metadata: {
        make_id: makeId,
        make_name: makeName,
        timestamp: new Date().toISOString(),
        ...additionalData
      }
    })
  }, [logEvent])

  return {
    logEvent,
    logPageView,
    logProductView,
    logAddToCart,
    logRemoveFromCart,
    logCheckoutStart,
    logOrderComplete,
    logSearch,
    logProductLike,
    logCategoryView,
    logCarMakeView,
  }
}

// Helper function to generate or retrieve session ID
function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return ''
  
  let sessionId = sessionStorage.getItem('analytics_session_id')
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    sessionStorage.setItem('analytics_session_id', sessionId)
  }
  return sessionId
}
