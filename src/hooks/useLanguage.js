import { useState, useCallback } from 'react';
import { flushSync } from 'react-dom';

export function useLanguage(initialLang = 'en') {
  const [currentLang, setCurrentLang] = useState(initialLang);
  const [renderKey, setRenderKey] = useState(0);

  const changeLanguage = useCallback((newLang) => {
    if (newLang !== currentLang) {
      // flushSync previene problemi di batching su mobile
      flushSync(() => {
        setCurrentLang(newLang);
        setRenderKey(prev => prev + 1);
      });
    }
  }, [currentLang]);

  return {
    currentLang,
    changeLanguage,
    renderKey
  };
}