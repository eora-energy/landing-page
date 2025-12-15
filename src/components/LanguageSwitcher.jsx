import { useState } from 'react';
import { languages } from '../utils/translations';

export default function LanguageSwitcher({ currentLang, onLanguageChange }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="language-switcher">
      <button 
        className="lang-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {languages.find(l => l.code === currentLang)?.flag}
        <span className="lang-name">
          {languages.find(l => l.code === currentLang)?.name}
        </span>
        <span className="arrow">{isOpen ? '▲' : '▼'}</span>
      </button>
      
      {isOpen && (
        <div className="lang-dropdown">
          {languages.map(lang => (
            <button
              key={lang.code}
              className={`lang-option ${currentLang === lang.code ? 'active' : ''}`}
              onClick={() => {
                onLanguageChange(lang.code);
                setIsOpen(false);
              }}
            >
              <span className="lang-flag">{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
