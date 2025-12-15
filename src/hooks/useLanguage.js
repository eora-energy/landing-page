// src/hooks/useLanguage.js
// Custom hook per gestire il cambio lingua in modo robusto su mobile

import { useState, useCallback } from 'react';
import { flushSync } from 'react-dom';

export function useLanguage(initialLang = 'en') {
  const [currentLang, setCurrentLang] = useState(initialLang);
  const [renderKey, setRenderKey] = useState(0);

  const changeLanguage = useCallback((newLang) => {
    if (newLang !== currentLang) {
      // flushSync forza React a applicare gli updates immediatamente
      // invece di batcharli. Questo risolve il problema su mobile.
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