# EoraEnergy Landing Page

Landing page per EoraEnergy. Attualmente in sviluppo. 🚀

Stack: React 18 + Vite (più veloce e leggero di CRA).

## 🎯 Features

Landing page multi-lingua (EN/IT/DE/FR) con animazioni CSS, effetti grafici e form newsletter integrato con Brevo.

Funzionalità principali:
- **Multi-lingua**: Switch lingua real-time, ottimizzato anche per mobile (iOS e Android testati)
- **Newsletter**: Integrazione completa con Brevo API per raccolta email
- **Animazioni**: Effetti visivi CSS puri (grid animata, sfere fluttuanti, gradienti)
- **Responsive**: Design mobile-first, testato su diversi dispositivi
- **API Serverless**: Endpoint Vercel Functions per gestione subscription

## 🚀 Setup Locale

```bash
# Clona il repo
git clone <repo-url>
cd landing-page

# Installa le dipendenze
npm install

# Avvia il dev server
npm run dev
```

Apri il browser su `http://localhost:5173`.

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

## 🌍 Sistema Multi-lingua

Il sistema supporta 4 lingue:
- 🇬🇧 English (default)
- 🇮🇹 Italiano
- 🇩🇪 Deutsch
- 🇫🇷 Français

### Implementazione

Il cuore del sistema è in `src/hooks/useLanguage.js`. Uso `flushSync` di React DOM per risolvere problemi di batching su mobile - senza, il dropdown si chiudeva ma la lingua non cambiava subito.

Per aggiungere una nuova lingua, modifica `src/utils/translations.js`.

**Nota**: La lingua selezionata non persiste al reload (riparte sempre da EN). Se serve persistenza, si può aggiungere facilmente con localStorage.

## 📧 Newsletter con Brevo

### Setup Account Brevo

1. Crea un account su [Brevo](https://www.brevo.com) (ex Sendinblue)
2. Genera una API key: Settings → API Keys → Create API Key
3. Crea una lista contatti: Contacts → Lists → Create a new list
4. Prendi nota del List ID (visibile nell'URL della lista)

### Configurazione Locale

Crea un file `.env` nella root del progetto:

```env
BREVO_API_KEY=xkeysib-your_api_key_here
BREVO_LIST_ID=your_list_id_here
PORT=3001
```

**Importante**: Il file `.env` è in `.gitignore` e non verrà mai committato. Usa `.env.example` come template.

### API Endpoints

Ci sono 3 endpoint serverless (Vercel Functions):

#### POST /api/subscribe
Aggiunge un contatto alla lista Brevo.

**Request:**
```json
{
  "name": "Mario Rossi",
  "email": "mario@example.com"
}
```

**Response (successo):**
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter"
}
```

**Response (errore):**
```json
{
  "error": "Email già registrata / Invalid email format / etc."
}
```

#### GET /api/test-brevo
Testa la connessione con Brevo e verifica che le credenziali funzionino.

#### GET /api/health
Health check endpoint - risponde con status 200 se tutto ok.

### Test API in Locale

Per testare gli endpoint API localmente:

```bash
# Installa Vercel CLI globalmente
npm i -g vercel

# Avvia il dev server (includerà anche le API)
vercel dev
```

Le API saranno disponibili su `http://localhost:3000/api/*`

**Test subscription con curl:**
```bash
curl -X POST http://localhost:3000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com"}'
```

**Test connessione Brevo:**
```bash
curl http://localhost:3000/api/test-brevo
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

### Build per Produzione

```bash
npm run build
```

I file ottimizzati vengono generati nella cartella `dist/`.

### Deploy su Vercel (Consigliato)

Metodo più semplice:

```bash
# Installa Vercel CLI
npm i -g vercel

# Deploy interattivo
vercel
```

**Configurazione Environment Variables:**
1. Vai su Vercel Dashboard → Settings → Environment Variables
2. Aggiungi:
   - `BREVO_API_KEY` → la tua API key Brevo
   - `BREVO_LIST_ID` → l'ID della tua lista

### Deploy su Netlify

1. Push del codice su GitHub
2. Connetti il repository su Netlify
3. Configura build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Aggiungi le environment variables nelle settings
5. Deploy

**Nota**: Su Netlify le API functions hanno una struttura diversa da Vercel. Potresti dover adattare i file in `api/`.

## 🐛 Known Issues / TODO

- [ ] La lingua selezionata non persiste al refresh (si può aggiungere localStorage)
- [ ] Validazione email più robusta lato client
- [ ] Ottimizzazione favicon e meta tags per SEO
- [ ] Rate limiting sugli endpoint API
- [ ] Test suite (Jest/Vitest + React Testing Library)
- [ ] Analytics integration (Google Analytics / Plausible)
- [x] ~~Fix cambio lingua su mobile iOS~~ (RISOLTO con flushSync)

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

React batchifica gli aggiornamenti di stato per ottimizzare le performance. Su mobile questo causava un problema: il dropdown si chiudeva ma la lingua non cambiava immediatamente, creando un'esperienza utente scadente.

`flushSync` forza React ad applicare subito gli update di stato, risolvendo il problema.

### Ottimizzazioni Mobile

Per garantire una UX ottimale su touch device:
- `touch-action: manipulation` → previene il doppio tap per zoom
- `-webkit-tap-highlight-color: transparent` → rimuove l'highlight blu su iOS
- Event handlers multipli: `onClick` (desktop) + `onTouchEnd` (mobile)

### Animazioni Pure CSS

Tutte le animazioni sono implementate in CSS puro, senza JavaScript. Vantaggi:
- Migliori performance (GPU-accelerated)
- Funziona anche con JS disabilitato
- Codice più pulito e manutenibile

## 🤝 Contributing

Pull requests are welcome. Per modifiche importanti, apri prima una issue per discutere cosa vorresti cambiare.

## 📄 License

Progetto personale. Usa pure il codice come riferimento, ma non copiare tutto 1:1.

---

**Made with ⚡ by Kris**

Per domande, problemi o suggerimenti → apri una issue.

---

*Ultimo aggiornamento: Dicembre 2025*