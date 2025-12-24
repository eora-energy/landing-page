export default function PartnersSection({ title, partners }) {
  return (
    <section className="partners-section block">
      {title && <h2 className="partners-title">{title}</h2>}
      <div className="partners-grid">
        {partners.map((partner, index) => (
          <div key={index} className="partner-item">
            <img 
              src={partner.logo} 
              className="partner-logo"
            />
          </div>
        ))}
      </div>
    </section>
  );
}