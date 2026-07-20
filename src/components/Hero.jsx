function Hero({ heading, subtext, ctaText, ctaLink }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>{heading}</h1>
        <p>{subtext}</p>
        <a href={ctaLink} className="btn-primary">{ctaText}</a>
      </div>
    </section>
  )
}

export default Hero