import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer">
      <Link to="/" className="logo">Lunara</Link>
      <nav>
        <Link to="/shop">Shop</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <p className="copyright">&copy; 2026 Lunara Home &amp; Lifestyle. All rights reserved.</p>
    </footer>
  )
}

export default Footer