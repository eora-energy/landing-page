import { useState } from 'react';

export default function NewsletterSection({ t }) {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email
        })
      });

      const data = await response.json();

      if (response.ok) {
        setShowSuccess(true);
        setFormData({ name: '', email: '' });
        
        setTimeout(() => {
          setShowSuccess(false);
        }, 5000);
      } else {
        alert(data.error || 'Subscription failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Connection error. Please check if the server is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="newsletter-section block">
      <div className="newsletter-container">
        <h2 className="newsletter-title">{t.newsletter.title}</h2>
        <p className="newsletter-subtitle">{t.newsletter.subtitle}</p>
        
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-input"
            placeholder={t.newsletter.namePlaceholder}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="email"
            className="form-input"
            placeholder={t.newsletter.emailPlaceholder}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <button 
            type="submit" 
            className="btn-submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner">⚡</span>
                {t.newsletter.buttonLoading}
              </>
            ) : (
              <>
                <span>⚡</span>
                {t.newsletter.button}
              </>
            )}
          </button>
        </form>

        {showSuccess && (
          <div className="success-message">
            ✓ {t.newsletter.success}
          </div>
        )}
      </div>
    </section>
  );
}
