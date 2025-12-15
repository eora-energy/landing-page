import LanguageSwitcher from './LanguageSwitcher';
import logo from '../assets/logo.png';

export default function Header({ currentLang, onLanguageChange }) {
  return (
    <header className="header">
      <div className="header-content">
        <img src={logo} alt="EoraEnergy" className="logo-img" />
        <LanguageSwitcher 
          currentLang={currentLang} 
          onLanguageChange={onLanguageChange}
        />
      </div>
    </header>
  );
}