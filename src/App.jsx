import { useState, useEffect } from 'react';
import AnimatedBackground from './components/AnimatedBackground';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import PartnersSection from './components/PartnersSection';
import InternalLogosSection from './components/InternalLogosSection';
import NewsletterSection from './components/NewsletterSection';
import FeaturesSection from './components/FeaturesSection';
import Footer from './components/Footer';
import { translations } from './utils/translations';
import { useLanguage } from './hooks/useLanguage';

export default function App() {
  const { currentLang, changeLanguage, renderKey } = useLanguage('en');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  const t = translations[currentLang];

  return (
    <div key={`app-${renderKey}`} className={`app ${isVisible ? 'visible' : ''}`}>
      <AnimatedBackground />
      
      <Header 
        currentLang={currentLang} 
        onLanguageChange={changeLanguage}
        brand={t.brand}
      />
      
      <main>
        <HeroSection t={{ hero: t.pilotProjectHero }} className="pilot-project-hero" />
        <PartnersSection partners={t.partners.list} />
        <NewsletterSection t={t} />
        <HeroSection t={t} className="main-hero" />
        <InternalLogosSection logos={t.internalLogos.list} />
      </main>

      <Footer text={t.footer} />
    </div>
  );
}