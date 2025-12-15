export default function FeaturesSection({ features }) {
  return (
    <section className="features-section block">
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <div className="feature-label">{feature.label}</div>
            <div className="feature-value">{feature.value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
