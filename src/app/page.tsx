import Link from "next/link";
import AuthNavButton from "@/components/AuthNavButton";
import PwaInstallButton from "@/components/PwaInstallButton";
import { SUPERMARKETS } from "@/data/supermarkets";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Header Essenziale */}
      <header className="bg-slate-800 border-b border-slate-700 px-4 py-3 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-bold text-lg text-white">
            DepotMatch
          </Link>
          <div className="flex items-center gap-2">
            <AuthNavButton />
            <PwaInstallButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 space-y-8">
        {/* Hero Essenziale */}
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Traccia e confronta i prezzi dei supermercati.
          </h1>
          <p className="text-sm text-slate-400 max-w-xl">
            Accedi per consultare i prezzi e le offerte delle principali catene di distribuzione italiane.
          </p>
          <div className="pt-2">
            <Link
              href="/login"
              className="inline-block px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm rounded-lg transition-colors"
            >
              Inizia subito (Accedi o Registrati) →
            </Link>
          </div>
        </div>

        {/* Elenco Supermercati Supportati */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
            Catene disponibili per il monitoraggio:
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {SUPERMARKETS.map((store) => (
              <div
                key={store.id}
                className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-xs"
              >
                <div className="font-semibold text-white">{store.name}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {store.category}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-4 px-4 text-center text-xs text-slate-500">
        DepotMatch &bull; Versione 1.0
      </footer>
    </div>
  );
}
