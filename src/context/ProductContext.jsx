import { createContext, useState, useEffect } from 'react'

export const ProductContext = createContext()

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem('lunara_favorites')
    return stored ? JSON.parse(stored) : []
  })

  useEffect(() => {
    fetch('https://week-4-lunara-9jq4.vercel.app/api/products')
      .then((res) => {
        if (!res.ok) throw new Error('Request failed')
        return res.json()
      })
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    localStorage.setItem('lunara_favorites', JSON.stringify(favorites))
  }, [favorites])

  function toggleFavorite(id) {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    )
  }

  return (
    <ProductContext.Provider value={{ products, loading, error, favorites, toggleFavorite }}>
      {children}
    </ProductContext.Provider>
  )
}