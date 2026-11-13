"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import PwaInstallButton from "@/components/PwaInstallButton";
import {
  LogOut,
  User,
  ShieldCheck,
  Calendar,
  KeyRound,
  Plus,
  Trash2,
  CheckCircle,
  ShoppingBag,
  Sparkles,
  ArrowLeft,
  Store,
  Layers,
} from "lucide-react";
import type { User as SupabaseUser } from "@supabase/supabase-js";

interface ListItem {
  id: string;
  name: string;
  checked: boolean;
  store: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<ListItem[]>([
    { id: "1", name: "Latte Intero 1L", checked: false, store: "Esselunga" },
    { id: "2", name: "Spaghetti N.5 500g", checked: true, store: "Conad" },
    { id: "3", name: "Caffè macinato 250g", checked: false, store: "Coop" },
  ]);
  const [newItemName, setNewItemName] = useState("");
  const [newItemStore, setNewItemStore] = useState("Esselunga");

  useEffect(() => {
    async function loadUser() {
      const supabase = createClient();
      if (!supabase) {
        setLoading(false);
        return;
      }

      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();

      if (!currentUser) {
        // Redirect to login if unauthenticated
        router.push("/login");
        return;
      }

      setUser(currentUser);
      setLoading(false);
    }

    loadUser();
  }, [router]);

  const handleSignOut = async () => {
    const supabase = createClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
    router.push("/login");
    router.refresh();
  };

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    setItems([
      ...items,
      {
        id: Date.now().toString(),
        name: newItemName.trim(),
        checked: false,
        store: newItemStore,
      },
    ]);
    setNewItemName("");
  };

  const toggleItem = (id: string) => {
    setItems(
      items.map((it) => (it.id === id ? { ...it, checked: !it.checked } : it))
    );
  };

  const deleteItem = (id: string) => {
    setItems(items.filter((it) => it.id !== id));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-400">Verifica sessione in corso...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-8 h-8 rounded-xl overflow-hidden border border-emerald-500/30">
                <Image
                  src="/icons/icon-192x192.png"
                  alt="DepotMatch Logo"
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
              <span className="font-bold tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                DepotMatch
              </span>
            </Link>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Area Riservata
            </span>
          </div>

          <div className="flex items-center gap-3">
            <PwaInstallButton />
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-medium transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-400" />
              <span>Esci</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 space-y-8">
        {/* Welcome Banner */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/20 p-6 md:p-8">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Accesso Effettuato con Successo</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Benvenuto su DepotMatch! 👋
            </h1>
            <p className="text-sm text-slate-300">
              Sei collegato con successo al backend di **Supabase**. Da qui potrai gestire le tue liste della spesa e monitorare le variazioni di prezzo dei supermercati.
            </p>
          </div>
        </section>

        {/* User Details & Status Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <section className="md:col-span-1 rounded-2xl bg-slate-900/80 border border-slate-800 p-5 space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-white">Profilo Utente</h2>
                <p className="text-[11px] text-slate-400">Dati sessione Supabase Auth</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <span className="text-slate-500 block text-[10px] uppercase font-mono">Email</span>
                <span className="text-slate-200 font-medium break-all">{user?.email}</span>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 block text-[10px] uppercase font-mono">User ID</span>
                <span className="text-slate-400 font-mono text-[11px] break-all">{user?.id}</span>
              </div>

              <div className="flex items-center gap-2 pt-2 text-emerald-400 text-xs font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>Sessione Crittografata Attiva</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Torna alla Homepage pubblica</span>
              </Link>
            </div>
          </section>

          {/* Interactive Feature: Shopping List & Price Comparator preview */}
          <section className="md:col-span-2 rounded-2xl bg-slate-900/80 border border-slate-800 p-5 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 flex-wrap gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-white">La Tua Lista della Spesa</h2>
                  <p className="text-[11px] text-slate-400">
                    Aggiungi articoli per simulare il calcolo del miglior supermercato
                  </p>
                </div>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                {items.filter((i) => i.checked).length}/{items.length} completati
              </span>
            </div>

            {/* Input Form */}
            <form onSubmit={addItem} className="flex gap-2">
              <input
                type="text"
                placeholder="Aggiungi un prodotto (es. Biscotti, Pasta)..."
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
              />
              <select
                value={newItemStore}
                onChange={(e) => setNewItemStore(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="Esselunga">Esselunga</option>
                <option value="Conad">Conad</option>
                <option value="Coop">Coop</option>
                <option value="Carrefour">Carrefour</option>
              </select>
              <button
                type="submit"
                className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-emerald-500/20"
              >
                <Plus className="w-4 h-4" />
                <span>Aggiungi</span>
              </button>
            </form>

            {/* Item list */}
            <div className="space-y-2">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                    item.checked
                      ? "bg-slate-950/40 border-slate-850 text-slate-500"
                      : "bg-slate-950 border-slate-800 text-slate-200"
                  }`}
                >
                  <div
                    onClick={() => toggleItem(item.id)}
                    className="flex items-center gap-3 cursor-pointer select-none flex-1"
                  >
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                        item.checked
                          ? "bg-emerald-500 border-emerald-500 text-slate-950"
                          : "border-slate-700 hover:border-emerald-400"
                      }`}
                    >
                      {item.checked && <CheckCircle className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <span className={`text-xs ${item.checked ? "line-through" : "font-medium"}`}>
                      {item.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-850 text-slate-400">
                      {item.store}
                    </span>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="p-1 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Supermarket Comparison Summary */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2">
              <div className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                <Store className="w-4 h-4 text-emerald-400" />
                <span>Stima Carrello per questa Lista (Simulazione)</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
                <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-emerald-300">
                  <div className="text-[10px] text-emerald-400 uppercase font-mono">Più Economico</div>
                  <div className="font-bold text-sm">Esselunga</div>
                  <div className="text-slate-400 text-[11px]">Totale: 6.87 €</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                  <div className="text-[10px] text-slate-500 uppercase font-mono">Conad</div>
                  <div className="font-bold text-sm">Conad</div>
                  <div className="text-slate-400 text-[11px]">Totale: 7.20 €</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                  <div className="text-[10px] text-slate-500 uppercase font-mono">Coop</div>
                  <div className="font-bold text-sm">Coop</div>
                  <div className="text-slate-400 text-[11px]">Totale: 7.45 €</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                  <div className="text-[10px] text-slate-500 uppercase font-mono">Carrefour</div>
                  <div className="font-bold text-sm">Carrefour</div>
                  <div className="text-slate-400 text-[11px]">Totale: 7.80 €</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
