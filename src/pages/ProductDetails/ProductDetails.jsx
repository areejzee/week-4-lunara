import { useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ProductContext } from '../../context/ProductContext'
import { CartContext } from '../../context/CartContext'
import Loading from '../../components/Loading/Loading'

function ProductDetails() {
  const { id } = useParams()
  const { products, loading, error, favorites, toggleFavorite } = useContext(ProductContext)
  const { addToCart } = useContext(CartContext)

  if (loading) return <Loading />
  if (error) return <p className="error-msg">Something went wrong. Please try again.</p>

  const product = products.find((p) => p.id === Number(id))
  if (!product) return <p className="empty-state">Product not found. <Link to="/shop">Back to shop</Link></p>

  const isFavorite = favorites.includes(product.id)

  return (
    <div className="product-details">
      <div className={`product-details-image swatch-${product.category.toLowerCase()}`}></div>
      <div className="product-details-info">
        <span className="product-category">{product.category}</span>
        <h1>{product.name}</h1>
        <p className="product-price">${product.price}</p>
        <p>{product.description}</p>
        <div className="product-details-actions">
          <button className="btn-primary" onClick={() => addToCart(product.id)}>Add to cart</button>
          <button className={`favorite-btn-large ${isFavorite ? 'active' : ''}`} onClick={() => toggleFavorite(product.id)}>
            {isFavorite ? '♥ Favorited' : '♡ Add to favorites'}
          </button>
        </div>
        <Link to="/shop" className="btn-secondary">Back to shop</Link>
      </div>
    </div>
  )
}

export default ProductDetails