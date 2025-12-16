import LanguageSwitcher from './LanguageSwitcher';

export default function Header({ currentLang, onLanguageChange }) {
  return (
    <header className="header">
      <div className="header-content">
        <img src="/logo.png" alt="EoraEnergy" className="logo-img" />
        <LanguageSwitcher 
          currentLang={currentLang} 
          onLanguageChange={onLanguageChange}
        />
      </div>
    </header>
  );
}