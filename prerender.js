import puppeteer from 'puppeteer'
import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { createServer } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

async function prerender() {
  console.log('🚀 Starting pre-render...')
  
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

  // 2. Lancia Puppeteer
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })
  
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