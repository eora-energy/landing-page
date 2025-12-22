import { useState, useEffect, useRef } from 'react';
import { languages } from '../utils/translations';

export default function LanguageSwitcher({ currentLang, onLanguageChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  const handleLanguageChange = (langCode) => {
    setIsOpen(false);

    // Piccolo delay per evitare conflitti tra chiusura dropdown e cambio lingua su mobile
    setTimeout(() => {
      onLanguageChange(langCode);
    }, 0);
  };

  return (
    <div className="language-switcher" ref={dropdownRef}>
      <button 
        className="lang-button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        type="button"
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
              type="button"
              className={`lang-option ${currentLang === lang.code ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleLanguageChange(lang.code);
              }}
              onTouchEnd={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleLanguageChange(lang.code);
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