import { useState } from 'react';

export default function NewsletterSection({ t }) {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validazione checkbox
    if (!acceptedTerms) {
      setError(t.newsletter.errorAccept || 'Please accept terms and privacy policy');
      return;
    }

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
        setAcceptedTerms(false);

        setTimeout(() => {
          setShowSuccess(false);
        }, 5000);
      } else {
        setError(data.error || 'Subscription failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Connection error. Please check if the server is running.');
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

          {/* Singolo checkbox per termini e privacy */}
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                className="checkbox-input"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
              />
              <span className="checkbox-text">
                {t.newsletter.acceptPrefix || 'I accept the'}{' '}
                <a 
                  href="/terms.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="checkbox-link"
                >
                  {t.newsletter.termsLink || 'Terms and Conditions'}
                </a>
                {' '}{t.newsletter.and || 'and'}{' '}
                <a 
                  href="/privacy.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="checkbox-link"
                >
                  {t.newsletter.privacyLink || 'Privacy Policy'}
                </a>
              </span>
            </label>
          </div>

          <button 
            type="submit" 
            className="btn-submit"
            disabled={isLoading || !acceptedTerms || !formData.name.trim() || !formData.email.trim()}
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

        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        {showSuccess && (
          <div className="success-message">
            ✓ {t.newsletter.success}
          </div>
        )}
      </div>
    </section>
  );
}