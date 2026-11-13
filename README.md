# DepotMatch 🛒🔍

**DepotMatch** è una Progressive Web App (PWA) progettata per tracciare e confrontare i prezzi e gli sconti dei principali supermercati italiani (Esselunga, Conad, Coop, Carrefour, ecc.).

---

## 🛠️ Stack Tecnologico

- **Framework**: Next.js 16 (App Router) + TypeScript
- **Styling**: Tailwind CSS + Lucide Icons
- **PWA**: `@ducanh2912/next-pwa` (Workbox Service Worker + Manifest)
- **Database & Auth**: Supabase (`@supabase/ssr`, `@supabase/supabase-js`)
- **Hosting**: Vercel

---

## 📍 Stato del Progetto

- [x] **Fase 1: PWA + Cloud Setup**
  - [x] Setup progetto Next.js con TypeScript e Tailwind CSS
  - [x] Configurazione PWA: Manifest, Service Worker, icone (192px, 512px, Apple Touch)
  - [x] Integrazione client & server SDK di Supabase
  - [x] Interfaccia responsive con anteprima confronto prezzi e stato infrastruttura
  - [ ] Deploy su Vercel e inserimento variabili d'ambiente
- [ ] **Fase 2: Connessione API Supermercati**
  - [ ] Ricerca ed integrazione endpoint API / scraping
  - [ ] Schema database Postgres (prodotti, prezzi, negozi, cronologia)
  - [ ] Cron job / Supabase Edge Functions per sincronizzazione prezzi
- [ ] **Fase 3: Funzionalità Avanzate**
  - [ ] Notifiche push su ribassi di prezzo
  - [ ] Lista della spesa con ottimizzazione automatica del carrello

---

## 🚀 Avvio in Locale

1. Installa le dipendenze:
   ```bash
   npm install
   ```

2. Configura le variabili d'ambiente per Supabase:
   Crea o modifica il file `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://tuo-progetto.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=la-tua-chiave-anon-pubblica
   ```

3. Avvia il server di sviluppo:
   ```bash
   npm run dev
   ```
   Apri [http://localhost:3000](http://localhost:3000).

4. Build di produzione:
   ```bash
   npm run build
   npm start
   ```

---

## 🌐 Deploy su Vercel

1. Fai il push su GitHub:
   ```bash
   git add .
   git commit -m "feat: initial commit with PWA and Supabase integration"
   git push -u origin main
   ```
2. Accedi a [Vercel](https://vercel.com) e importa il repository `MicheleVirelli/DepotMatch`.
3. Nelle impostazioni del progetto su Vercel (*Environment Variables*), aggiungi:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Clicca su **Deploy**. La tua PWA sarà subito raggiungibile su un dominio HTTPS `https://depotmatch.vercel.app`.
