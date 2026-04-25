import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "@/data/products";
import { useFinish } from "@/context/FinishContext";

type SearchContextValue = {
  query: string;
  setQuery: (q: string) => void;
  clear: () => void;
  results: Product[];
  isActive: boolean;
};

const SearchContext = createContext<SearchContextValue | null>(null);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("");
  const { finish } = useFinish();

  const value = useMemo<SearchContextValue>(() => {
    const q = query.trim().toLowerCase();
    const isActive = q.length > 0;
    const pool =
      finish === "Metallic"
        ? products.filter((p) => p.material === "Metallic")
        : finish === "Chrome"
          ? products.filter((p) => p.material === "Chrome")
          : products;
    const results = isActive
      ? pool.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.series.toLowerCase().includes(q) ||
            p.desc.toLowerCase().includes(q) ||
            p.material.toLowerCase().includes(q) ||
            p.badge?.toLowerCase().includes(q),
        )
      : [];
    return { query, setQuery, clear: () => setQuery(""), results, isActive };
  }, [query, finish]);

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearch must be used within SearchProvider");
  return ctx;
}
