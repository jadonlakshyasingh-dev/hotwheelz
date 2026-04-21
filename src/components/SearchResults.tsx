import { ProductCard } from "./ProductCard";
import { useSearch } from "@/context/SearchContext";
import { Search, X } from "lucide-react";

export function SearchResults() {
  const { query, results, clear, isActive } = useSearch();

  if (!isActive) return null;

  return (
    <section id="search-results" className="relative py-24 px-6 scroll-mt-24">
      <div className="container mx-auto">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-primary mb-3 inline-flex items-center gap-2">
              <Search className="h-3 w-3" />
              // Search results
            </div>
            <h2 className="font-display text-4xl md:text-5xl uppercase leading-[0.95]">
              {results.length} {results.length === 1 ? "match" : "matches"} for{" "}
              <span className="text-gradient-flame">"{query}"</span>
            </h2>
          </div>
          <button
            onClick={clear}
            className="inline-flex items-center gap-2 px-4 py-2 border border-border hover:border-primary hover:text-primary rounded-md font-display uppercase tracking-wider text-xs transition-all"
          >
            <X className="h-3.5 w-3.5" />
            Clear search
          </button>
        </div>

        {results.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((p) => (
              <ProductCard key={p.id} product={p} compact />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-dashed border-border rounded-2xl">
            <Search className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
            <p className="font-display text-2xl uppercase mb-2">No rides found</p>
            <p className="text-muted-foreground text-sm">
              Try "classic", "supercar", "limited", or a model name like "phantom".
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
