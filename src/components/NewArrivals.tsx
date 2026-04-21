import { useRef } from "react";
import classic from "@/assets/car-classic.jpg";
import supercar from "@/assets/car-supercar.jpg";
import limited from "@/assets/car-limited.jpg";
import { ChevronLeft, ChevronRight } from "lucide-react";

const arrivals = [
  { img: supercar, name: "Volt Striker", series: "Supercar", price: "$26" },
  { img: limited, name: "Phoenix Reign", series: "Limited", price: "$54" },
  { img: classic, name: "Ruby Rocket", series: "Classic", price: "$16" },
  { img: supercar, name: "Cyber Lynx", series: "Supercar", price: "$28" },
  { img: limited, name: "Solar Fang", series: "Limited", price: "$62" },
  { img: classic, name: "Midnight Mustang", series: "Classic", price: "$18" },
];

export function NewArrivals() {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    ref.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  return (
    <section id="new" className="relative py-28 px-6 overflow-hidden">
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
        {arrivals.map((c, i) => (
          <article
            key={i}
            className="snap-start flex-shrink-0 w-[300px] bg-card border border-border rounded-xl overflow-hidden group hover-lift"
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={c.img}
                alt={c.name}
                loading="lazy"
                width={1024}
                height={1024}
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="p-5">
              <div className="text-[10px] uppercase tracking-widest text-primary">{c.series}</div>
              <div className="flex justify-between items-center mt-1">
                <h3 className="font-display text-xl uppercase">{c.name}</h3>
                <span className="font-display text-gradient-flame">{c.price}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
