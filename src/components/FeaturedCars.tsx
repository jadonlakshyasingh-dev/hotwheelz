import classic from "@/assets/car-classic.jpg";
import supercar from "@/assets/car-supercar.jpg";
import limited from "@/assets/car-limited.jpg";
import { Flame, Star } from "lucide-react";

const cars = [
  { img: classic, name: "Crimson Charger", series: "Classic", speed: 220, badge: "Bestseller", price: "$14" },
  { img: supercar, name: "Neon Phantom GT", series: "Supercar", speed: 340, badge: "New", price: "$22" },
  { img: limited, name: "Inferno Blaze", series: "Limited", speed: 280, badge: "Rare", price: "$48" },
];

export function FeaturedCars() {
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
            Hand-picked rides from the latest drop. Each one engineered for raw, unfiltered velocity.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {cars.map((c, i) => (
            <article
              key={c.name}
              className="group relative bg-card border border-border rounded-2xl overflow-hidden hover-lift"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 px-3 py-1 bg-flame text-primary-foreground text-[10px] font-display uppercase tracking-widest rounded-full">
                <Flame className="h-3 w-3" />
                {c.badge}
              </div>

              <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-secondary to-background relative">
                <img
                  src={c.img}
                  alt={c.name}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="h-full w-full object-cover group-hover:scale-110 group-hover:-rotate-2 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-primary">{c.series}</div>
                    <h3 className="font-display text-2xl uppercase mt-1">{c.name}</h3>
                  </div>
                  <div className="font-display text-2xl text-gradient-flame">{c.price}</div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <Star key={k} className="h-3.5 w-3.5 fill-primary text-primary" />
                    ))}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    Top <span className="text-foreground font-display">{c.speed}</span> mph
                  </div>
                </div>

                <button className="w-full py-3 border border-primary/40 hover:bg-flame hover:border-transparent hover:text-primary-foreground font-display uppercase tracking-wider text-xs rounded-md transition-all">
                  Add to Garage
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
