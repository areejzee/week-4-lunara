import { useState, useContext } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ProductContext } from '../../context/ProductContext'
import ProductCard from '../../components/ProductCard/ProductCard'
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter'
import SearchBar from '../../components/SearchBar/SearchBar'
import Loading from '../../components/Loading/Loading'

function Shop() {
  const [searchParams] = useSearchParams()
  const { products, loading, error, favorites, toggleFavorite } = useContext(ProductContext)
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'All')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = [...new Set(products.map((p) => p.category))]

  const filteredProducts = products
    .filter((p) => activeCategory === 'All' || p.category === activeCategory)
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))

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