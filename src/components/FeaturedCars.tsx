import { ProductCard } from "./ProductCard";
import { products } from "@/data/products";
import { useFinish } from "@/context/FinishContext";

export function FeaturedCars() {
  const { finish } = useFinish();

  const metallicPicks = ["crimson-charger", "neon-phantom-gt", "inferno-blaze"];
  const chromePicks = ["chrome-fury", "chrome-phantom", "chrome-twin-mill"];

  const ids =
    finish === "Chrome" ? chromePicks : finish === "Metallic" ? metallicPicks : metallicPicks;

  const featured = ids.map((id) => products.find((p) => p.id === id)!).filter(Boolean);

  return (
    <section id="featured" className="relative py-28 px-6">
      <div className="container mx-auto">
        <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-primary mb-3">// Garage</div>
            <h2 className="font-display text-5xl md:text-6xl uppercase">
              Featured <span className="text-gradient-flame">Machines</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm">
            {finish === "Chrome"
              ? "Mirror-plated drops from the chrome line. Display-grade reflections."
              : "Hand-picked rides from the latest drop. Each one engineered for raw, unfiltered velocity."}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
