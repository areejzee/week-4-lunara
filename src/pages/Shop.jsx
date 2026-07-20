import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import CategoryFilter from '../components/CategoryFilter'
import SearchBar from '../components/SearchBar'
import Loading from '../components/Loading'

function Shop() {
  const [searchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'All')
  const [searchTerm, setSearchTerm] = useState('')
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
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

  const categories = [...new Set(products.map((p) => p.category))]

  const filteredProducts = products
    .filter((p) => activeCategory === 'All' || p.category === activeCategory)
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))

  function toggleFavorite(id) {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    )
  }

  return (
    <div className="shop-page">
      <h1>Shop</h1>

      <div className="shop-controls">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        {categories.length > 0 && (
          <CategoryFilter categories={categories} activeCategory={activeCategory} onSelect={setActiveCategory} />
        )}
      </div>

      {loading && <Loading />}
      {error && <p className="error-msg">Something went wrong. Please try again.</p>}

      {!loading && !error && filteredProducts.length === 0 && (
        <p className="empty-state">No products match your search.</p>
      )}

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isFavorite={favorites.includes(product.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  )
}

export default Shop