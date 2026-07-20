import { Link } from 'react-router-dom'

function CategorySection({ categories }) {
  return (
    <section className="category-section">
      <h2>Shop by category</h2>
      <div className="category-grid">
        {categories.map((cat) => (
          <Link to={`/shop?category=${cat.name}`} key={cat.name} className="category-card">
            <img src={cat.image} alt={cat.name} className="category-image-file" />
            <span>{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default CategorySection