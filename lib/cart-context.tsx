"use client"

import React, { createContext, useContext, useEffect, useMemo, useState, useCallback, type ReactNode } from 'react'

export interface CartItem {
  productId: string
  productName: string
  variantId: string
  variantName: string
  unitPrice: number
  quantity: number
  imageUrl?: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void
  setItems: (items: CartItem[]) => void
  removeItem: (productId: string, variantId: string) => void
  updateQuantity: (productId: string, variantId: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  totalItems: number
  totalPrice: number
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const STORAGE_KEY = "ml_cart_v1"

function safeParseCart(raw: string | null): CartItem[] {
  if (!raw) return []
  try {
    const v = JSON.parse(raw) as unknown
    if (!Array.isArray(v)) return []
    return v
      .map((it: any) => ({
        productId: String(it.productId ?? ""),
        productName: String(it.productName ?? ""),
        variantId: String(it.variantId ?? ""),
        variantName: String(it.variantName ?? ""),
        unitPrice: Number(it.unitPrice ?? 0),
        quantity: Number(it.quantity ?? 0),
        imageUrl: it.imageUrl ? String(it.imageUrl) : undefined,
      }))
      .filter((it) => it.productId && it.variantId && Number.isFinite(it.unitPrice) && it.quantity > 0)
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const raw = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null
    setItems(safeParseCart(raw))
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  // Keep cart synchronized across tabs/windows
  useEffect(() => {
    if (typeof window === "undefined") return
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return
      setItems(safeParseCart(e.newValue))
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  const addItem = useCallback((newItem: Omit<CartItem, 'quantity'>, quantity = 1) => {
    const q = Math.max(1, Number(quantity) || 1)
    setItems((prev) => {
      const existingItem = prev.find(
        (item) => item.productId === newItem.productId && item.variantId === newItem.variantId
      )
      if (existingItem) {
        return prev.map((item) =>
          item.productId === newItem.productId && item.variantId === newItem.variantId
            ? { ...item, quantity: item.quantity + q }
            : item
        )
      }
      return [...prev, { ...newItem, quantity: q }]
    })
  }, [])

  const removeItem = useCallback((productId: string, variantId: string) => {
    setItems((prev) => prev.filter((item) => !(item.productId === productId && item.variantId === variantId)))
  }, [])

  const updateQuantity = useCallback((productId: string, variantId: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(productId, variantId)
      return
    }
    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId && item.variantId === variantId ? { ...item, quantity } : item
      )
    )
  }, [removeItem])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const totalItems = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items])
  const totalPrice = useMemo(() => items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0), [items])

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        setItems,
        removeItem,
        updateQuantity,
        clearCart,
        getTotalItems: () => totalItems,
        getTotalPrice: () => totalPrice,
        totalItems,
        totalPrice,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
