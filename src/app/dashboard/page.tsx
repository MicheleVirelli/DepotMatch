"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { SUPERMARKETS, type Supermarket } from "@/data/supermarkets";

export default function DashboardPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Tutti");
  const [selectedSupermarket, setSelectedSupermarket] = useState<Supermarket | null>(null);

  useEffect(() => {
    async function checkUser() {
      const supabase = createClient();
      if (!supabase) {
        setLoading(false);
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      setUserEmail(user.email ?? "Utente");
      setLoading(false);
    }

    checkUser();
  }, [router]);

  const handleSignOut = async () => {
    const supabase = createClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
    router.push("/login");
    router.refresh();
  };

  const filteredSupermarkets = useMemo(() => {
    return SUPERMARKETS.filter((store) => {
      const matchesSearch = store.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "Tutti" || store.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4">
        <div className="text-center text-sm text-slate-400">
          Caricamento sessione...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Barra Superiore Essenziale */}
      <header className="bg-slate-800 border-b border-slate-700 px-4 py-3 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-base text-white">DepotMatch</span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-slate-400 hidden sm:inline">{userEmail}</span>
            <button
              onClick={handleSignOut}
              className="px-2.5 py-1 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded border border-slate-600 transition-colors"
            >
              Esci
            </button>
          </div>
        </div>
      </header>

      {/* Contenuto Principale */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6 space-y-6">
        {/* Titolo e Istruzioni */}
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">
            Di quale supermercato vuoi vedere i prezzi?
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Seleziona una delle principali catene di distribuzione per consultare prodotti e sconti.
          </p>
        </div>

        {/* Barra di ricerca e Filtro categoria */}
        <div className="space-y-3">
          <input
            type="search"
            placeholder="Cerca supermercato (es. Conad, Esselunga, Lidl)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />

          <div className="flex gap-2 overflow-x-auto pb-1 text-xs">
            {["Tutti", "Superstore & Iper", "Discount"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium transition-colors ${
                  selectedCategory === cat
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Griglia Supermercati */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredSupermarkets.map((store) => {
            const isSelected = selectedSupermarket?.id === store.id;
            return (
              <button
                key={store.id}
                type="button"
                onClick={() => setSelectedSupermarket(store)}
                className={`text-left p-4 rounded-xl border transition-all flex flex-col justify-between ${
                  isSelected
                    ? "bg-slate-800 border-emerald-500 ring-2 ring-emerald-500/30"
                    : "bg-slate-800/80 border-slate-700 hover:border-slate-600 hover:bg-slate-800"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-base text-white">
                      {store.name}
                    </span>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-700 text-slate-300">
                      {store.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    {store.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs">
                  <span
                    className={`font-medium ${
                      isSelected ? "text-emerald-400" : "text-slate-400"
                    }`}
                  >
                    {isSelected ? "✓ Selezionato" : "Tocca per scegliere"}
                  </span>
                  <span className="text-slate-500">→</span>
                </div>
              </button>
            );
          })}
        </div>

        {filteredSupermarkets.length === 0 && (
          <div className="text-center py-8 text-slate-500 text-sm">
            Nessun supermercato trovato con il nome &quot;{searchQuery}&quot;.
          </div>
        )}

        {/* Banner di Conferma Supermercato Selezionato */}
        {selectedSupermarket && (
          <div className="sticky bottom-4 bg-emerald-950 border border-emerald-700 rounded-xl p-4 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs text-emerald-300 font-medium">
                Supermercato attivo:
              </div>
              <div className="text-base font-bold text-white">
                {selectedSupermarket.name}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                alert(
                  `Hai selezionato ${selectedSupermarket.name}. Nella prossima fase collegheremo le API o il catalogo per questo supermercato.`
                );
              }}
              className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              Conferma e visualizza prodotti
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
