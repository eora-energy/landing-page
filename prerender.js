import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { createServer } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Rileva se siamo su Vercel/produzione o locale
const isProduction = process.env.VERCEL || process.env.CI

async function prerender() {
  console.log('🚀 Starting pre-render...')
  console.log(`Environment: ${isProduction ? 'Production (Vercel)' : 'Local (Dev)'}`)
  
  // 1. Avvia server Vite in preview mode
  const server = await createServer({
    root: __dirname,
    server: {
      port: 5173
    },
    preview: true
  })
  
  await server.listen()
  console.log('✓ Preview server started on http://localhost:5173')

  // 2. Lancia Puppeteer - configurazione diversa per prod/local
  let browser
  
  if (isProduction) {
    // Vercel/Produzione: usa Chromium serverless
    const puppeteerCore = await import('puppeteer-core')
    const chromium = await import('@sparticuz/chromium')
    
    browser = await puppeteerCore.default.launch({
      args: chromium.default.args,
      defaultViewport: chromium.default.defaultViewport,
      executablePath: await chromium.default.executablePath(),
      headless: chromium.default.headless,
    })
  } else {
    // Locale: usa Puppeteer normale
    const puppeteer = await import('puppeteer')
    
    browser = await puppeteer.default.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
  }
  
  const page = await browser.newPage()
  
  // 3. Naviga alla pagina e aspetta che React renderizzi
  console.log('🔄 Rendering page...')
  await page.goto('http://localhost:5173', {
    waitUntil: 'networkidle0',
    timeout: 30000
  })
  
  // Aspetta che il contenuto sia visibile
  await page.waitForSelector('.app.visible', { timeout: 5000 })
  
  // Aspetta un secondo extra per le animazioni
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // 4. Prendi l'HTML renderizzato
  const html = await page.content()
  
  // 5. Salva il file
  const indexPath = join(__dirname, 'dist', 'index.html')
  writeFileSync(indexPath, html)
  
  console.log('✓ Pre-rendered HTML saved to dist/index.html')
  
  // 6. Cleanup
  await browser.close()
  await server.close()
  
  console.log('✅ Pre-rendering complete!')
}

prerender().catch(err => {
  console.error('❌ Pre-rendering failed:', err)
  process.exit(1)
})