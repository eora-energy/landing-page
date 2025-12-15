# EoraEnergy Landing Page

Landing page multi-lingua per EoraEnergy con React + Vite.

## 🚀 Quick Start

1. **Installa le dipendenze**
```bash
npm install
```

2. **Avvia il server di sviluppo**
```bash
npm run dev
```

3. **Apri il browser**
- Vai su `http://localhost:5173`
- La landing page è live! 🎉

## 📁 Struttura del Progetto

```
eora-energy-landing/
├── src/
│   ├── components/              # Tutti i componenti
│   │   ├── AnimatedBackground.jsx
│   │   ├── Header.jsx
│   │   ├── LanguageSwitcher.jsx
│   │   ├── HeroSection.jsx
│   │   ├── StatusSection.jsx
│   │   ├── NewsletterSection.jsx
│   │   ├── FeaturesSection.jsx
│   │   └── Footer.jsx
│   │
│   ├── utils/
│   │   └── translations.js      # Tutte le traduzioni
│   │
│   ├── styles/
│   │   └── global.css           # Tutti gli stili
│   │
│   ├── App.jsx                  # Componente principale
│   └── main.jsx                 # Entry point
│
├── index.html
├── package.json
└── vite.config.js
```

## 🌍 Lingue Supportate

- 🇬🇧 Inglese (default)
- 🇮🇹 Italiano
- 🇩🇪 Tedesco
- 🇫🇷 Francese

Per aggiungere nuove lingue, modifica `src/utils/translations.js`.

## 📧 Integrazione Newsletter Brevo

Per connettere il form alla newsletter Brevo:

1. Apri `src/components/NewsletterSection.jsx`
2. Trova il commento `// TODO: Sostituisci con la tua chiamata API Brevo`
3. Sostituisci la simulazione con una vera chiamata API

**Esempio:**
```javascript
const response = await fetch('/api/subscribe', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
});
```

Vedi il README principale per istruzioni complete su Brevo.

## 🎨 Personalizzazione

### Modificare i colori
Apri `src/styles/global.css` e modifica le variabili CSS:
```css
:root {
  --primary: #FFFF00;
  --secondary: #A8CCAB;
  --dark-bg: #1A4E59;
  --darker-bg: #173456;
  --text-light: #D3E5F7;
}
```

### Modificare i testi
Tutti i testi sono in `src/utils/translations.js`.

### Modificare le animazioni
Gli stili e animazioni sono in `src/styles/global.css`.

## 🏗️ Build per Produzione

```bash
npm run build
```

I file ottimizzati saranno in `dist/`.

## 🚀 Deploy

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
1. Push su GitHub
2. Connetti repository su Netlify
3. Deploy automatico!

## 📝 Script Disponibili

- `npm run dev` - Avvia server di sviluppo
- `npm run build` - Build per produzione
- `npm run preview` - Preview della build

## 💡 Tips

- Clicca sul logo per vedere un'animazione!
- Il language switcher è nel header
- Form newsletter ha validazione integrata
- Tutto responsive mobile-first

Buon lavoro! ⚡
