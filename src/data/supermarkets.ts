export interface Supermarket {
  id: string;
  name: string;
  category: "Superstore & Iper" | "Discount" | "Prossimità";
  description: string;
  color: string;
  available: boolean;
}

export const SUPERMARKETS: Supermarket[] = [
  {
    id: "esselunga",
    name: "Esselunga",
    category: "Superstore & Iper",
    description: "Offerte Fidaty e catalogo online",
    color: "#0284c7",
    available: true,
  },
  {
    id: "conad",
    name: "Conad",
    category: "Superstore & Iper",
    description: "Hey Conad, volantini e spesa online",
    color: "#ea580c",
    available: true,
  },
  {
    id: "coop",
    name: "Coop",
    category: "Superstore & Iper",
    description: "Soci Coop, ViviVerde e offerte locali",
    color: "#dc2626",
    available: true,
  },
  {
    id: "carrefour",
    name: "Carrefour",
    category: "Superstore & Iper",
    description: "Carrefour Market, Express e Iper",
    color: "#2563eb",
    available: true,
  },
  {
    id: "lidl",
    name: "Lidl",
    category: "Discount",
    description: "Offerte settimanali e Lidl Plus",
    color: "#eab308",
    available: true,
  },
  {
    id: "eurospin",
    name: "Eurospin",
    category: "Discount",
    description: "La Spesa Intelligente, prezzi bassi tutti i giorni",
    color: "#059669",
    available: true,
  },
  {
    id: "penny",
    name: "Penny Market",
    category: "Discount",
    description: "Penny Card e sconti a tempo",
    color: "#b91c1c",
    available: true,
  },
  {
    id: "despar",
    name: "Despar / Interspar",
    category: "Superstore & Iper",
    description: "Eurospar, Interspar e promozioni Tribù",
    color: "#16a34a",
    available: true,
  },
  {
    id: "pam",
    name: "Pam Panorama",
    category: "Superstore & Iper",
    description: "Pam Local, Panorama e Carta Per Te",
    color: "#0891b2",
    available: true,
  },
  {
    id: "bennet",
    name: "Bennet",
    category: "Superstore & Iper",
    description: "Bennetdrive e promozioni Bennet Club",
    color: "#4f46e5",
    available: true,
  },
  {
    id: "md",
    name: "MD",
    category: "Discount",
    description: "Offerte volantino e prodotti a marchio",
    color: "#d97706",
    available: true,
  },
  {
    id: "tigros",
    name: "Tigros",
    category: "Superstore & Iper",
    description: "Tigros Drive e Fidelity Card",
    color: "#7c3aed",
    available: true,
  },
];
