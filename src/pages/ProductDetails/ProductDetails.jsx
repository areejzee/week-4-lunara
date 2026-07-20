import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Loading from '../components/Loading'

function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('http://localhost:5000/api/products')
      .then((res) => {
        if (!res.ok) throw new Error('Request failed')
        return res.json()
      })
      .then((data) => {
        const found = data.find((p) => p.id === Number(id))
        setProduct(found || null)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [id])

  if (loading) return <Loading />
  if (error) return <p className="error-msg">Something went wrong. Please try again.</p>
  if (!product) return <p className="empty-state">Product not found. <Link to="/shop">Back to shop</Link></p>

 return (
    <div className="product-details">
      <img src={product.image} alt={product.name} className="product-details-img-file" />
      
      <div className="product-details-info">
        <span className="product-category">{product.category}</span>
        <h1>{product.name}</h1>
        <p className="product-price">${product.price}</p>
        <p>{product.description}</p>
        <Link to="/shop" className="btn-secondary">Back to shop</Link>
      </div>
    </div>
  )
}

export default ProductDetails