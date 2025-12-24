export default function HeroSection({ t, className = '' }) {
  return (
    <section className={`hero-section block ${className}`}>
      <div className="hero-content">
        <h1 className="hero-title">
          {t.hero.title[0]} <span className="highlight">{t.hero.title[1]}</span>
          <br />
          {t.hero.title[2]}
        </h1>
        <p className="hero-subtitle">{t.hero.subtitle}</p>
      </div>
    </section>
  );
}