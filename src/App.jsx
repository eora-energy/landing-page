import { useState, useEffect } from 'react';
import AnimatedBackground from './components/AnimatedBackground';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import StatusSection from './components/StatusSection';
import NewsletterSection from './components/NewsletterSection';
import FeaturesSection from './components/FeaturesSection';
import Footer from './components/Footer';
import { translations } from './utils/translations';

export default function App() {
  const [currentLang, setCurrentLang] = useState('en');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const t = translations[currentLang];

  return (
    <div className={`app ${isVisible ? 'visible' : ''}`}>
      <AnimatedBackground />
      
      <Header 
        currentLang={currentLang} 
        onLanguageChange={setCurrentLang}
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
