"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Database, AlertCircle, CheckCircle2 } from "lucide-react";

export default function SupabaseStatus() {
  const [status, setStatus] = useState<"checking" | "connected" | "missing_keys" | "error">("checking");
  const [details, setDetails] = useState<string>("");

  useEffect(() => {
    async function checkSupabase() {
      const client = createClient();
      if (!client) {
        setStatus("missing_keys");
        setDetails("Chiavi NEXT_PUBLIC_SUPABASE_URL e KEY mancanti in .env.local");
        return;
      }

      try {
        // Simple health ping to supabase auth session or general endpoint
        const { error } = await client.auth.getSession();
        if (error) {
          setStatus("error");
          setDetails(error.message);
        } else {
          setStatus("connected");
          setDetails("Connesso al database Supabase");
        }
      } catch (err: unknown) {
        setStatus("error");
        setDetails(err instanceof Error ? err.message : "Errore di connessione a Supabase");
      }
    }

    checkSupabase();
  }, []);

  if (status === "connected") {
    return (
      <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
        <CheckCircle2 className="w-4 h-4" />
        <span>Supabase: Connesso</span>
      </div>
    );
  }

  if (status === "missing_keys") {
    return (
      <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-medium" title={details}>
        <AlertCircle className="w-4 h-4 text-amber-400" />
        <span>Supabase: Configurazione chiavi in sospeso</span>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium" title={details}>
        <AlertCircle className="w-4 h-4 text-rose-400" />
        <span>Supabase: Errore di connessione</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-400 text-xs font-medium">
      <Database className="w-4 h-4 animate-pulse" />
      <span>Supabase: Verifica in corso...</span>
    </div>
  );
}
