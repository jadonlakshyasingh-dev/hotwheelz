import { useMemo } from "react";
import { Flame, Tag } from "lucide-react";
import { products, type Category } from "@/data/products";
import { useSearch } from "@/context/SearchContext";
import { useFinish } from "@/context/FinishContext";
import { useCurrency } from "@/context/CurrencyContext";

type Props = {
  onSelect?: () => void;
  className?: string;
};

const ALL_CATEGORIES: Category[] = ["Classic", "Supercar", "Limited"];

export function SearchAutocomplete({ onSelect, className = "" }: Props) {
  const { query, setQuery } = useSearch();
  const { finish } = useFinish();
  const { format } = useCurrency();
  const q = query.trim().toLowerCase();

  const { models, categories } = useMemo(() => {
    if (!q) return { models: [], categories: [] as Category[] };
    const pool =
      finish === "Metallic"
        ? products.filter((p) => p.material === "Metallic")
        : finish === "Chrome"
          ? products.filter((p) => p.material === "Chrome")
          : products;
    const models = pool
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.series.toLowerCase().includes(q) ||
          p.badge?.toLowerCase().includes(q),
      )
      .slice(0, 5);
    const categories = ALL_CATEGORIES.filter((c) => c.toLowerCase().includes(q));
    return { models, categories };
  }, [q, finish]);

  if (!q) return null;
  const empty = models.length === 0 && categories.length === 0;

  const pick = (value: string) => {
    setQuery(value);
    onSelect?.();
  };

  return (
    <div
      className={`absolute top-full left-0 right-0 mt-2 z-50 rounded-xl border border-border bg-popover/95 backdrop-blur-md shadow-flame overflow-hidden animate-ignite ${className}`}
      role="listbox"
    >
      {empty && (
        <div className="px-4 py-3 text-xs uppercase tracking-widest text-muted-foreground">
          No suggestions
        </div>
      )}

      {categories.length > 0 && (
        <div className="py-1">
          <div className="px-3 pt-2 pb-1 text-[10px] uppercase tracking-widest text-muted-foreground">
            Categories
          </div>
          {categories.map((c) => (
            <button
              key={c}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => pick(c)}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-secondary/60 text-left transition-colors"
              role="option"
            >
              <Tag className="h-3.5 w-3.5 text-primary" />
              <span>{c}s</span>
              <span className="ml-auto text-[10px] uppercase tracking-widest text-muted-foreground">
                Series
              </span>
            </button>
          ))}
        </div>
      )}

      {models.length > 0 && (
        <div className="py-1 border-t border-border/60">
          <div className="px-3 pt-2 pb-1 text-[10px] uppercase tracking-widest text-muted-foreground">
            Top Models
          </div>
          {models.map((p) => (
            <button
              key={p.id}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => pick(p.name)}
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-secondary/60 text-left transition-colors"
              role="option"
            >
              <img
                src={p.img}
                alt={p.name}
                className="h-8 w-12 object-cover rounded-md border border-border"
                loading="lazy"
              />
              <div className="min-w-0 flex-1">
                <div className="text-sm truncate flex items-center gap-1.5">
                  {p.name}
                  {p.badge && (
                    <span className="inline-flex items-center gap-0.5 text-[9px] uppercase tracking-wider text-primary">
                      <Flame className="h-2.5 w-2.5" />
                      {p.badge}
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-muted-foreground">
                  {p.series} · {format(p.price)}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
