import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="navbar">
      <Link to="/" className="logo">Lunara</Link>

      <nav className={`nav-links ${isOpen ? 'open' : ''}`}>
        <NavLink to="/" onClick={() => setIsOpen(false)}>Home</NavLink>
        <NavLink to="/shop" onClick={() => setIsOpen(false)}>Shop</NavLink>
        <NavLink to="/about" onClick={() => setIsOpen(false)}>About</NavLink>
        <NavLink to="/contact" onClick={() => setIsOpen(false)}>Contact</NavLink>
      </nav>

      <button className="nav-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle navigation">
        <span></span><span></span><span></span>
      </button>
    </header>
  )
}

export default Navbar