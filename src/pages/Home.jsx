import Hero from '../components/Hero'
import CategorySection from '../components/CategorySection'

const categories = [
  { name: 'Furniture', image: '/furniture.jpg' },
  { name: 'Lighting', image: '/lighting.jpg' },
  { name: 'Decor', image: '/decor.jpg' },
  { name: 'Textiles', image: '/textiles.jpg' },
]

function Home() {
  return (
    <div>
      <Hero
        heading="Furnish a home that feels like you."
        subtext="Thoughtfully designed furniture, lighting, and decor for everyday living."
        ctaText="Shop the collection"
        ctaLink="/shop"
      />
      <CategorySection categories={categories} />

      <section className="philosophy-strip">
        <h2>Simple pieces, made to last.</h2>
        <p>We design around quality materials and quiet, lasting style, not trends that fade by next season.</p>
      </section>
    </div>
  )
}

export default Home