import { useState, useEffect } from 'react';
import AnimatedBackground from './components/AnimatedBackground';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
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
    
    // Fix: Forza scroll to top al mount/ricarica pagina
    // Previene che il browser "ricordi" la posizione scroll precedente
    window.scrollTo(0, 0);
    
    // Disabilita scroll restoration del browser
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  const t = translations[currentLang];

  return (
    // Key per forzare il re-mount completo su cambio lingua
    <div key={`app-${renderKey}`} className={`app ${isVisible ? 'visible' : ''}`}>
      <AnimatedBackground />
      
      <Header 
        currentLang={currentLang} 
        onLanguageChange={changeLanguage}
        brand={t.brand}
      />
      
      <main>
        <HeroSection t={t} />
        <NewsletterSection t={t} />
        <FeaturesSection features={t.features} />
      </main>

      <Footer text={t.footer} />
    </div>
  );
}