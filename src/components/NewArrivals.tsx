import { useRef } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useFinish, finishStyles } from "@/context/FinishContext";
import { toast } from "sonner";
import { newArrivals } from "@/data/products";

export function NewArrivals() {
  const ref = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();
  const { finish } = useFinish();
  const fx = finishStyles[finish];

  const scroll = (dir: number) => {
    ref.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  const handleAdd = (c: (typeof newArrivals)[number]) => {
    addItem({ id: c.id, name: c.name, series: c.series, price: c.price, img: c.img, finish });
    toast.success(`${c.name} added`, {
      description: `${finish} • $${c.price.toFixed(2)}`,
    });
  };

  return (
    <section id="new" className="relative py-24 px-6 overflow-hidden">
      <div className="container mx-auto">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-primary mb-3">// Just Dropped</div>
            <h2 className="font-display text-5xl md:text-6xl uppercase">
              New <span className="text-gradient-flame">Arrivals</span>
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scroll(-1)}
              className="p-3 rounded-full border border-border hover:border-primary hover:text-primary transition-all"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll(1)}
              className="p-3 rounded-full border border-border hover:border-primary hover:text-primary transition-all"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={ref}
        className="flex gap-5 overflow-x-auto pb-6 px-6 md:px-[max(1.5rem,calc((100vw-1280px)/2))] snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none" }}
      >
        {visible.map((c) => (
          <article
            key={c.id}
            className="snap-start flex-shrink-0 w-[280px] bg-card border border-border rounded-xl overflow-hidden group hover-lift"
          >
            <div className={`aspect-square overflow-hidden relative ${fx.ring}`}>
              <img
                src={c.img}
                alt={`${c.name} — ${finish} finish`}
                loading="lazy"
                width={1024}
                height={768}
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className={`pointer-events-none absolute inset-0 ${fx.overlay}`} aria-hidden />
              <div
                className={`absolute top-3 left-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-display uppercase tracking-widest ${fx.chip}`}
              >
                <span aria-hidden>{fx.icon}</span>
                {finish}
              </div>
              <button
                onClick={() => handleAdd(c)}
                className="absolute bottom-3 right-3 h-11 w-11 rounded-full bg-flame text-primary-foreground flex items-center justify-center shadow-flame opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all hover:scale-110"
                aria-label={`Add ${c.name} to cart`}
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4">
              <div className="text-[10px] uppercase tracking-widest text-primary">{c.series}</div>
              <div className="flex justify-between items-center mt-1">
                <h3 className="font-display text-lg uppercase truncate">{c.name}</h3>
                <span className="font-display text-gradient-flame">${c.price}</span>
              </div>
              <button
                onClick={() => handleAdd(c)}
                className="mt-3 w-full py-2 border border-primary/40 hover:bg-flame hover:border-transparent hover:text-primary-foreground font-display uppercase tracking-wider text-[11px] rounded-md transition-all"
              >
                Add to cart
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
