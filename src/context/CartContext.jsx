import { createContext, useState, useEffect } from 'react'

export const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem('lunara_cart')
    return stored ? JSON.parse(stored) : []
  })

  useEffect(() => {
    localStorage.setItem('lunara_cart', JSON.stringify(cart))
  }, [cart])

  function addToCart(productId) {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === productId)
      if (existing) {
        return prev.map((item) =>
          item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { productId, quantity: 1 }]
    })
  }

  function updateQuantity(productId, quantity) {
    if (quantity < 1) return
    setCart((prev) =>
      prev.map((item) => (item.productId === productId ? { ...item, quantity } : item))
    )
  }

  function removeFromCart(productId) {
    setCart((prev) => prev.filter((item) => item.productId !== productId))
  }

  function clearCart() {
    setCart([])
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}