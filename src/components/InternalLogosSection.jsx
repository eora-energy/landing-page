export default function InternalLogosSection({ logos }) {
  return (
    <section className="internal-section block">
      <div className="internal-grid">
        {logos.map((logo, index) => (
          <div key={index} className="internal-item">
            <img 
              src={logo.logo} 
              className="internal-logo"
            />
          </div>
        ))}
      </div>
    </section>
  );
}