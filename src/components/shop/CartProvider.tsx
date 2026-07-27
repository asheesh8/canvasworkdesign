'use client'

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type CartItem = {
  id: string // product+size
  title: string
  size: string
  price: number
  image: string
  qty: number
}

type CartCtx = {
  items: CartItem[]
  add: (item: Omit<CartItem, 'qty'>) => void
  remove: (id: string) => void
  setQty: (id: string, qty: number) => void
  clear: () => void
  count: number
  subtotal: number
  open: boolean
  setOpen: (v: boolean) => void
}

const Ctx = createContext<CartCtx | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('cw-cart')
      if (raw) setItems(JSON.parse(raw))
    } catch {}
  }, [])
  useEffect(() => {
    try {
      localStorage.setItem('cw-cart', JSON.stringify(items))
    } catch {}
  }, [items])

  const add: CartCtx['add'] = (item) => {
    setItems((prev) => {
      const found = prev.find((p) => p.id === item.id)
      if (found) return prev.map((p) => (p.id === item.id ? { ...p, qty: p.qty + 1 } : p))
      return [...prev, { ...item, qty: 1 }]
    })
    setOpen(true)
  }
  const remove: CartCtx['remove'] = (id) => setItems((prev) => prev.filter((p) => p.id !== id))
  const setQty: CartCtx['setQty'] = (id, qty) =>
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, qty: Math.max(1, qty) } : p)))
  const clear = () => setItems([])

  const value = useMemo<CartCtx>(
    () => ({
      items,
      add,
      remove,
      setQty,
      clear,
      open,
      setOpen,
      count: items.reduce((n, i) => n + i.qty, 0),
      subtotal: items.reduce((n, i) => n + i.qty * i.price, 0),
    }),
    [items, open],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useCart() {
  const c = useContext(Ctx)
  if (!c) throw new Error('useCart must be used within CartProvider')
  return c
}
