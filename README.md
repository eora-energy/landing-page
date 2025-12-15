# EoraEnergy Landing Page

Landing page per EoraEnergy. Work in progress, ovviamente. 🚀

Progetto fatto con React + Vite perché sì, mi piace vivere pericolosamente senza CRA.

## 🎯 Cosa fa

Una landing page multi-lingua (EN/IT/DE/FR) con animazioni, effetti grafici carini e un form newsletter integrato con Brevo. 

Features principali:
- **Multi-lingua**: Cambio lingua al volo, funziona anche su mobile (ci ho sbattuto la testa un po')
- **Newsletter**: Integrazione con Brevo per raccogliere email
- **Animazioni**: Roba che brilla, sfere che fluttuano, grid che si muove - il pacchetto completo
- **Responsive**: Funziona su desktop e mobile (testato su vari device, trust me)
- **API Serverless**: Backend minimal per gestire le subscription

## 🚀 Quick Start

```bash
# Clona il repo
git clone <repo-url>
cd eora-energy-landing

# Installa dipendenze
npm install

# Avvia dev server
npm run dev
```

Apri `http://localhost:5173` e voilà.

## 📁 Struttura Progetto

```
eora-energy-landing/
├── src/
│   ├── components/         # Tutti i componenti React
│   │   ├── AnimatedBackground.jsx
│   │   ├── Header.jsx
│   │   ├── LanguageSwitcher.jsx
│   │   ├── HeroSection.jsx
│   │   ├── NewsletterSection.jsx
│   │   ├── FeaturesSection.jsx
│   │   └── Footer.jsx
│   │
│   ├── hooks/              # Custom hooks
│   │   └── useLanguage.js  # Hook per gestire cambio lingua
│   │
│   ├── utils/
│   │   └── translations.js # Tutte le traduzioni
│   │
│   ├── styles/
│   │   └── global.css      # Tutti gli stili
│   │
│   ├── assets/             # Logo e altre risorse
│   ├── App.jsx             # Componente principale
│   └── main.jsx            # Entry point
│
├── api/                    # API serverless per newsletter
│   ├── subscribe.js        # Endpoint per subscription
│   ├── test-brevo.js       # Test connessione Brevo
│   └── health.js           # Health check
│
├── public/                 # File statici e favicon
├── index.html
├── package.json
└── vite.config.js
```

## 🌍 Multi-lingua

Ho implementato un sistema di cambio lingua che:
- Supporta EN, IT, DE, FR
- Persiste la scelta dell'utente (in realtà no, per ora ogni refresh riparte da EN)
- Funziona anche su mobile iOS/Android (questo è stato un casino)

### Come funziona

Il cuore sta in `src/hooks/useLanguage.js`. Ho usato `flushSync` da React DOM perché su mobile c'erano problemi con il batching degli update. Ora funziona smooth.

Tutte le traduzioni sono in `src/utils/translations.js` - se devi aggiungere una lingua, vai lì.

## 📧 Newsletter & Brevo

### Setup Brevo

1. Vai su [Brevo](https://www.brevo.com) e crea un account
2. Genera una API key da Settings → API Keys
3. Crea una lista contatti e prendi il List ID

### Configurazione

Crea un file `.env` nella root:

```env
BREVO_API_KEY=xkeysib-la_tua_api_key_qui
BREVO_LIST_ID=il_tuo_list_id_qui
PORT=3001
```

**Nota**: Il file `.env` è in `.gitignore`, quindi non finirà su GitHub. C'è `.env.example` come riferimento.

### API Endpoints

Ho creato 3 endpoint serverless (tipo Vercel Functions):

#### POST /api/subscribe
Aggiunge un contatto alla lista Brevo.

Request:
```json
{
  "name": "Mario Rossi",
  "email": "mario@example.com"
}
```

Response:
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter"
}
```

#### GET /api/test-brevo
Testa la connessione con Brevo. Utile per debug.

#### GET /api/health
Health check per vedere se l'API è viva.

### Test Locale API

Per testare le API in locale:

```bash
# Installa Vercel CLI
npm i -g vercel

# Avvia dev server
vercel dev
```

Le API saranno disponibili su `http://localhost:3000/api/*`

Per testare la subscription:
```bash
curl -X POST http://localhost:3000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com"}'
```

## 🎨 Customizzazione

### Colori

Vai in `src/styles/global.css` e modifica le variabili CSS:

```css
:root {
  --primary: #FFFF00;        /* Giallo principale */
  --secondary: #A8CCAB;      /* Verde secondario */
  --dark-bg: #1A4E59;        /* Background scuro */
  --darker-bg: #173456;      /* Background più scuro */
  --text-light: #D3E5F7;     /* Testo chiaro */
}
```

### Testi

Tutti i testi sono in `src/utils/translations.js`. Modifica lì per cambiare contenuti.

### Animazioni

Le animazioni sono tutte in CSS. Se vuoi modificarle cerca gli `@keyframes` in `global.css`.

## 🏗️ Build & Deploy

### Build Produzione

```bash
npm run build
```

I file ottimizzati finiscono in `dist/`.

### Deploy su Vercel

Il modo più semplice:

```bash
# Installa Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Prima del deploy, configura le environment variables su Vercel:
- `BREVO_API_KEY`
- `BREVO_LIST_ID`

Settings → Environment Variables su Vercel dashboard.

### Deploy su Netlify

1. Push su GitHub
2. Connetti il repo su Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Aggiungi le env variables nelle settings

**Nota**: Su Netlify devi configurare le API functions diversamente (usano una struttura diversa da Vercel).

## 🐛 Bug Conosciuti / TODO

- [ ] Il cambio lingua non persiste al refresh (aggiungi localStorage se serve)
- [ ] Manca validazione email più robusta lato client
- [ ] Favicon potrebbero essere ottimizzati meglio
- [ ] Aggiungere rate limiting alle API
- [ ] Test suite? Maybe un giorno...
- [x] Fix cambio lingua su mobile iOS (RISOLTO con flushSync)

## 📱 Mobile

Testato su:
- iPhone (Safari)
- Android (Chrome)
- iPad

Il language switcher aveva problemi su iOS, risolto con `flushSync` e gestione eventi touch migliore.

## 🔧 Script Disponibili

```bash
npm run dev      # Dev server con HMR
npm run build    # Build per produzione
npm run preview  # Preview build locale
```

## 💡 Note Tecniche

### Perché flushSync?

React batchifica gli update di stato per performance. Su mobile questo causava problemi con il cambio lingua - il dropdown si chiudeva ma la lingua non cambiava immediatamente. `flushSync` forza React ad applicare gli update subito.

### Gestione Touch su Mobile

Ho aggiunto:
- `touch-action: manipulation` per prevenire il doppio tap zoom
- `-webkit-tap-highlight-color` per rimuovere l'highlight su iOS
- Event handlers sia per `onClick` che `onTouchEnd`

### Animazioni CSS

Tutto CSS puro, zero JS per le animazioni. Performa meglio e funziona anche se JS è disabilitato (lol chi disabilita JS nel 2025).

## 🤝 Contributing

Se vuoi contribuire, fai una PR. Ma onestamente non so perché vorresti contribuire a una landing page di work in progress. 😅

## 📄 License

Fai quello che vuoi, basta non dire che è tuo.

---

**Made with ⚡ by Kris**

Per domande o problemi, apri una issue o mandami un messaggio.

P.S. Sì, ho usato gli emoji nel README. Fight me. 🥊