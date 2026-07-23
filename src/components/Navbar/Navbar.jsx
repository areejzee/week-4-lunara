import { useState, useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { CartContext } from '../../context/CartContext'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()
  const { cart } = useContext(CartContext)
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="navbar">
      <Link to="/" className="logo">Lunara</Link>

      <nav className={`nav-links ${isOpen ? 'open' : ''}`}>
        <NavLink to="/" onClick={() => setIsOpen(false)}>Home</NavLink>
        <NavLink to="/shop" onClick={() => setIsOpen(false)}>Shop</NavLink>
        <NavLink to="/about" onClick={() => setIsOpen(false)}>About</NavLink>
        <NavLink to="/contact" onClick={() => setIsOpen(false)}>Contact</NavLink>
        <NavLink to="/dashboard" onClick={() => setIsOpen(false)} className="cart-link">
          Cart {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </NavLink>
        {user ? (
          <button className="nav-auth-btn" onClick={logout}>Logout</button>
        ) : (
          <NavLink to="/login" onClick={() => setIsOpen(false)}>Login</NavLink>
        )}
      </nav>

      <button className="nav-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle navigation">
        <span></span><span></span><span></span>
      </button>
    </header>
  )
}

export default Navbar