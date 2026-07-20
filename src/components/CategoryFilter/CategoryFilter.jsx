function CategoryFilter({ categories, activeCategory, onSelect }) {
  return (
    <div className="category-filter">
      <button
        className={activeCategory === 'All' ? 'active' : ''}
        onClick={() => onSelect('All')}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          className={activeCategory === cat ? 'active' : ''}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter