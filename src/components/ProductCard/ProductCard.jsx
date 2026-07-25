import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'

function ProductCard({ product, isFavorite, onToggleFavorite }) {
  const { addToCart } = useContext(CartContext)

  return (
    <div className="product-card">

      <Link to={`/product/${product.id}`} className="product-image-link">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
      </Link>

      <button
        className={`favorite-btn ${isFavorite ? 'active' : ''}`}
        onClick={() => onToggleFavorite(product.id)}
        aria-label="Toggle favorite"
      >
        {isFavorite ? '♥' : '♡'}
      </button>

      <div className="product-info">
        <span className="product-category">{product.category}</span>

        <Link to={`/product/${product.id}`}>
          <h3>{product.name}</h3>
        </Link>

        <p className="product-price">${product.price}</p>

        <button
          className="add-to-cart-btn"
          onClick={() => addToCart(product.id)}
        >
          Add to cart
        </button>
      </div>

    </div>
  )
}

export default ProductCard