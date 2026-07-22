import { useState, useContext } from 'react'
import useAuth from '../../hooks/useAuth'
import { CartContext } from '../../context/CartContext'
import { ProductContext } from '../../context/ProductContext'

function Dashboard() {
  const { user, updateProfile } = useAuth()
  const { cart, updateQuantity, removeFromCart } = useContext(CartContext)
  const { products, favorites, toggleFavorite } = useContext(ProductContext)
  const [activeTab, setActiveTab] = useState('profile')
  const [nameInput, setNameInput] = useState(user?.name || '')

  const cartProducts = cart
    .map((item) => ({ ...item, product: products.find((p) => p.id === item.productId) }))
    .filter((item) => item.product)

  const favoriteProducts = products.filter((p) => favorites.includes(p.id))

  function handleSaveProfile(e) {
    e.preventDefault()
    updateProfile({ name: nameInput })
  }

  return (
    <div className="dashboard-page">
      <h1>My Account</h1>

      <div className="dashboard-tabs">
        <button className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}>Profile</button>
        <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>Orders</button>
        <button className={activeTab === 'favorites' ? 'active' : ''} onClick={() => setActiveTab('favorites')}>Favorites</button>
        <button className={activeTab === 'cart' ? 'active' : ''} onClick={() => setActiveTab('cart')}>Cart</button>
      </div>

      {activeTab === 'profile' && (
        <div className="dashboard-panel">
          <form onSubmit={handleSaveProfile}>
            <div className="field">
              <label htmlFor="dashName">Name</label>
              <input id="dashName" value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
            </div>
            <div className="field">
              <label>Email</label>
              <input value={user?.email || ''} disabled />
            </div>
            <button type="submit">Save changes</button>
          </form>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="dashboard-panel">
          <p className="empty-state">You have no past orders yet.</p>
        </div>
      )}

      {activeTab === 'favorites' && (
        <div className="dashboard-panel">
          {favoriteProducts.length === 0 && <p className="empty-state">You haven't favorited anything yet.</p>}
          <div className="dashboard-list">
            {favoriteProducts.map((product) => (
              <div className="dashboard-list-item" key={product.id}>
                <div className={`dashboard-list-swatch swatch-${product.category.toLowerCase()}`}></div>
                <span>{product.name}</span>
                <span>${product.price}</span>
                <button onClick={() => toggleFavorite(product.id)}>Remove</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'cart' && (
        <div className="dashboard-panel">
          {cartProducts.length === 0 && <p className="empty-state">Your cart is empty.</p>}
          <div className="dashboard-list">
            {cartProducts.map((item) => (
              <div className="dashboard-list-item" key={item.productId}>
                <div className={`dashboard-list-swatch swatch-${item.product.category.toLowerCase()}`}></div>
                <span>{item.product.name}</span>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.productId, Number(e.target.value))}
                  className="quantity-input"
                />
                <span>${item.product.price * item.quantity}</span>
                <button onClick={() => removeFromCart(item.productId)}>Remove</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard