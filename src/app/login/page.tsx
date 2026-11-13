"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfoMessage(null);
    setLoading(true);

    const supabase = createClient();
    if (!supabase) {
      setError("Configurazione Supabase non disponibile.");
      setLoading(false);
      return;
    }

    try {
      if (!isRegister) {
        // Login
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (signInError) {
          setError(
            signInError.message === "Invalid login credentials"
              ? "Credenziali errate. Verifica email e password."
              : signInError.message
          );
        } else {
          router.push("/dashboard");
          router.refresh();
        }
      } else {
        // Registrazione
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
          },
        });

        if (signUpError) {
          setError(signUpError.message);
        } else if (data.user && data.session) {
          router.push("/dashboard");
          router.refresh();
        } else {
          setInfoMessage(
            "Account creato! Controlla la tua email per confermare la registrazione."
          );
        }
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Si è verificato un errore."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-center items-center px-4 py-8">
      <div className="w-full max-w-sm">
        {/* Header semplice */}
        <div className="text-center mb-6">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-white hover:text-emerald-400 transition-colors"
          >
            DepotMatch
          </Link>
          <p className="text-sm text-slate-400 mt-1">
            {isRegister ? "Registrati per continuare" : "Accedi per vedere i prezzi"}
          </p>
        </div>

        {/* Card Form */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-sm">
          {/* Selettore Accedi / Registrati */}
          <div className="flex border-b border-slate-700 mb-5">
            <button
              type="button"
              onClick={() => {
                setIsRegister(false);
                setError(null);
                setInfoMessage(null);
              }}
              className={`flex-1 pb-2.5 text-sm font-semibold text-center border-b-2 transition-colors ${
                !isRegister
                  ? "border-emerald-500 text-emerald-400"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              Accedi
            </button>
            <button
              type="button"
              onClick={() => {
                setIsRegister(true);
                setError(null);
                setInfoMessage(null);
              }}
              className={`flex-1 pb-2.5 text-sm font-semibold text-center border-b-2 transition-colors ${
                isRegister
                  ? "border-emerald-500 text-emerald-400"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              Registrati
            </button>
          </div>

          {/* Messaggi di Errore / Info */}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-950/50 border border-red-800 text-red-200 text-xs">
              {error}
            </div>
          )}

          {infoMessage && (
            <div className="mb-4 p-3 rounded-lg bg-emerald-950/50 border border-emerald-800 text-emerald-200 text-xs">
              {infoMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-slate-300 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nome@email.it"
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium text-slate-300 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete={isRegister ? "new-password" : "current-password"}
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimo 6 caratteri"
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-medium text-sm rounded-lg transition-colors mt-2"
            >
              {loading
                ? "Attendere..."
                : isRegister
                ? "Crea account"
                : "Accedi"}
            </button>
          </form>
        </div>

        {/* Link ritorno */}
        <div className="text-center mt-5">
          <Link
            href="/"
            className="text-xs text-slate-400 hover:text-slate-200 underline"
          >
            ← Torna alla pagina iniziale
          </Link>
        </div>
      </div>
    </main>
  );
}
