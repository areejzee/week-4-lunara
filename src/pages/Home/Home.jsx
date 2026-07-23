import { Link } from 'react-router-dom'

const categories = [
  { name: 'Furniture', image: '/category-furniture.jpg' },
  { name: 'Lighting', image: '/category-lighting.jpg' },
  { name: 'Decor', image: '/category-decor.jpg' },
  { name: 'Textiles', image: '/category-textiles.jpg' },
]

function Home() {
  return (
    <div>
      <section className="hero" style={{ backgroundImage: "linear-gradient(rgba(51,48,46,0.45), rgba(51,48,46,0.45)), url('/hero.jpg')" }}>
        <div className="hero-content">
          <h1>Furnish a home that feels like you.</h1>
          <p>Thoughtfully designed furniture, lighting, and decor for everyday living.</p>
          <Link to="/shop" className="btn-primary">Shop the collection</Link>
        </div>
      </section>

      <section className="category-section">
        <h2>Shop by category</h2>
        <div className="category-grid">
          {categories.map((cat) => (
            <Link to={`/shop?category=${cat.name}`} key={cat.name} className="category-card">
              <img src={cat.image} alt={cat.name} className="category-image" />
              <span>{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="philosophy-strip">
        <h2>Simple pieces, made to last.</h2>
        <p>We design around quality materials and quiet, lasting style, not trends that fade by next season.</p>
      </section>
    </div>
  )
}

export default Home