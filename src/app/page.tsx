import Image from "next/image";
import PwaInstallButton from "@/components/PwaInstallButton";
import SupabaseStatus from "@/components/SupabaseStatus";
import AuthNavButton from "@/components/AuthNavButton";
import {
  ShoppingCart,
  TrendingDown,
  Sparkles,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
  Tag,
  Search,
  ExternalLink,
} from "lucide-react";

const DEMO_PRODUCTS = [
  {
    id: 1,
    name: "Pasta Barilla Spaghetti N.5 (500g)",
    category: "Pasta & Riso",
    lowest: { store: "Esselunga", price: "0.89 €", discount: "-31%" },
    prices: [
      { store: "Esselunga", price: "0.89 €", original: "1.29 €", isBest: true },
      { store: "Conad", price: "1.09 €", original: "1.29 €", isBest: false },
      { store: "Coop", price: "1.19 €", original: "1.29 €", isBest: false },
      { store: "Carrefour", price: "1.25 €", original: "1.25 €", isBest: false },
    ],
  },
  {
    id: 2,
    name: "Caffè Lavazza Qualità Rossa (2x250g)",
    category: "Caffè & Colazione",
    lowest: { store: "Conad", price: "4.49 €", discount: "-25%" },
    prices: [
      { store: "Conad", price: "4.49 €", original: "5.99 €", isBest: true },
      { store: "Coop", price: "4.99 €", original: "5.89 €", isBest: false },
      { store: "Esselunga", price: "5.19 €", original: "5.99 €", isBest: false },
      { store: "Carrefour", price: "5.49 €", original: "5.99 €", isBest: false },
    ],
  },
  {
    id: 3,
    name: "Olio Extra Vergine Monini Classico (1L)",
    category: "Condimenti",
    lowest: { store: "Coop", price: "8.99 €", discount: "-20%" },
    prices: [
      { store: "Coop", price: "8.99 €", original: "11.20 €", isBest: true },
      { store: "Esselunga", price: "9.49 €", original: "11.49 €", isBest: false },
      { store: "Carrefour", price: "9.90 €", original: "11.90 €", isBest: false },
      { store: "Conad", price: "10.29 €", original: "11.50 €", isBest: false },
    ],
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-emerald-500/30 shadow-md shadow-emerald-500/10">
              <Image
                src="/icons/icon-192x192.png"
                alt="DepotMatch Logo"
                fill
                sizes="36px"
                className="object-cover"
                priority
              />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
                DepotMatch
              </span>
              <span className="ml-2 text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Fase 1: PWA
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <AuthNavButton />
            <PwaInstallButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 space-y-10">
        {/* Status Bar */}
        <section className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Stato Infrastruttura:</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-xs text-slate-200 border border-slate-700">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>Next.js 16 + PWA Service Worker</span>
            </div>
            <SupabaseStatus />
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-xs text-slate-200 border border-slate-700">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Vercel Ready</span>
            </div>
          </div>
        </section>

        {/* Hero Banner */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-8 md:p-12">
          <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -left-16 -bottom-16 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

          <div className="max-w-2xl space-y-5 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fase 1: Configurazione PWA & Cloud</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Trova sempre il prezzo migliore per la tua spesa.
            </h1>

            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              DepotMatch raccoglie e confronta in tempo reale i prezzi e le offerte tra i principali supermercati (Esselunga, Conad, Coop, Carrefour) per farti risparmiare su ogni carrello.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <PwaInstallButton />
              <a
                href="#roadmap"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-all border border-slate-700"
              >
                <span>Roadmap di sviluppo</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Interactive Preview Mockup */}
        <section className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                <Tag className="w-5 h-5 text-emerald-400" />
                <span>Anteprima Funzionalità: Confronto Prezzi</span>
              </h2>
              <p className="text-xs text-slate-400">
                Ecco come appariranno i prodotti quando collegheremo le API dei supermercati nella Fase 2.
              </p>
            </div>

            {/* Fake Search Bar */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cerca prodotto (es. pasta, caffè)..."
                readOnly
                value=""
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-300 placeholder:text-slate-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {DEMO_PRODUCTS.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between rounded-2xl bg-slate-900/80 border border-slate-800 p-5 hover:border-slate-700 transition-colors group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">{item.category}</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                      {item.lowest.discount}
                    </span>
                  </div>

                  <h3 className="font-semibold text-slate-100 text-sm group-hover:text-emerald-300 transition-colors">
                    {item.name}
                  </h3>

                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
                    <div className="text-[11px] text-slate-400 uppercase font-mono tracking-wider">
                      Miglior prezzo attuale:
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-xl font-extrabold text-emerald-400">
                        {item.lowest.price}
                      </span>
                      <span className="text-xs text-slate-300 bg-slate-800 px-2 py-0.5 rounded-md">
                        {item.lowest.store}
                      </span>
                    </div>
                  </div>

                  {/* Price breakdown */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-[11px] text-slate-500 font-medium">Altri punti vendita:</div>
                    {item.prices.map((p, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center justify-between text-xs py-1 px-2 rounded-lg ${
                          p.isBest
                            ? "bg-emerald-950/30 text-emerald-300 font-semibold"
                            : "text-slate-400 hover:bg-slate-800/40"
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          {p.isBest && <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />}
                          {p.store}
                        </span>
                        <div className="flex items-center gap-2">
                          {p.original !== p.price && (
                            <span className="line-through text-slate-600 text-[10px]">
                              {p.original}
                            </span>
                          )}
                          <span>{p.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <ShoppingCart className="w-3.5 h-3.5 text-slate-400" />
                    Monitorato 2h fa
                  </span>
                  <span className="text-emerald-400 hover:underline cursor-pointer">Dettagli &rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Roadmap / Phased Plan */}
        <section id="roadmap" className="rounded-3xl bg-slate-900/50 border border-slate-800 p-6 md:p-8 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-400" />
              <span>Stato del Progetto & Prossimi Passi</span>
            </h2>
            <p className="text-xs text-slate-400">
              Avanzamento passo dopo passo secondo il piano stabilito.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Phase 1 */}
            <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3 relative overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div className="font-semibold text-emerald-300">Fase 1: PWA + Cloud (In Corso)</div>
              <ul className="text-xs text-slate-300 space-y-2">
                <li className="flex items-center gap-2 text-emerald-400">
                  <span>✓</span> Next.js 16 + TypeScript configurato
                </li>
                <li className="flex items-center gap-2 text-emerald-400">
                  <span>✓</span> PWA Manifest, Service Worker & Icone
                </li>
                <li className="flex items-center gap-2 text-emerald-400">
                  <span>✓</span> Client Supabase integrato
                </li>
                <li className="flex items-center gap-2 text-amber-300">
                  <span>⏳</span> Deploy su Vercel & credenziali Supabase
                </li>
              </ul>
            </div>

            {/* Phase 2 */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 opacity-80">
              <div className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div className="font-semibold text-slate-300">Fase 2: Connessione API Supermercati</div>
              <ul className="text-xs text-slate-400 space-y-2">
                <li>• Reverse-engineering / endpoint API supermercati</li>
                <li>• Funzioni serverless / cron job per aggiornamento prezzi</li>
                <li>• Schema tabelle Postgres su Supabase (prodotti, sconti)</li>
              </ul>
            </div>

            {/* Phase 3 */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 opacity-80">
              <div className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center font-bold text-sm">
                3
              </div>
              <div className="font-semibold text-slate-300">Fase 3: Notifiche & Carrello Intelligente</div>
              <ul className="text-xs text-slate-400 space-y-2">
                <li>• Notifiche push PWA sui ribassi di prezzo</li>
                <li>• Lista della spesa con calcolo del supermercato più conveniente</li>
                <li>• Storico dell&apos;andamento prezzi nel tempo</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Supabase & Vercel Quick Setup Guide */}
        <section className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 space-y-4">
          <h3 className="font-semibold text-sm text-slate-200 flex items-center gap-2">
            <span>🚀 Come completare la connessione a Vercel & Supabase</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-400">
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2">
              <div className="font-semibold text-slate-200">1. Supabase (Database)</div>
              <p>
                Crea un progetto gratuito su{" "}
                <a
                  href="https://supabase.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 underline inline-flex items-center gap-0.5"
                >
                  supabase.com <ExternalLink className="w-3 h-3" />
                </a>
                . Copia l&apos;URL del progetto e la Anon Key in <code className="text-amber-300">.env.local</code>.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2">
              <div className="font-semibold text-slate-200">2. Vercel (Hosting)</div>
              <p>
                Il repository GitHub è già configurato su <code className="text-emerald-300">MicheleVirelli/DepotMatch</code>.
                Facendo il push, puoi importarlo con 1 click su Vercel oppure distribuirlo direttamente da CLI.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-500">
        <p>DepotMatch &bull; PWA Price Tracker per Supermercati &bull; 2026</p>
      </footer>
    </div>
  );
}
