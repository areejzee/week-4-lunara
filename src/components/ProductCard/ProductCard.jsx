import { Link } from 'react-router-dom'

function ProductCard({ product, isFavorite, onToggleFavorite }) {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-image-link">
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-img-file" 
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
      </div>
    </div>
  )
}

export default ProductCard