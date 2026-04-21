import classic from "@/assets/car-classic.jpg";
import supercar from "@/assets/car-supercar.jpg";
import limited from "@/assets/car-limited.jpg";
import { ArrowUpRight } from "lucide-react";

const collections = [
  {
    img: classic,
    name: "Classics",
    count: 124,
    tag: "Heritage",
    desc: "Timeless muscle and chrome icons",
    href: "#classics",
  },
  {
    img: supercar,
    name: "Supercars",
    count: 86,
    tag: "Future",
    desc: "Aerodynamic beasts, neon lit",
    href: "#supercars",
  },
  {
    img: limited,
    name: "Limited Edition",
    count: 32,
    tag: "Rare",
    desc: "Numbered drops, never restocked",
    href: "#limited",
  },
];

export function Collections() {
  return (
    <section id="collections" className="relative py-28 px-6 bg-secondary/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="text-xs uppercase tracking-[0.3em] text-primary mb-3">// Series</div>
          <h2 className="font-display text-5xl md:text-6xl uppercase">
            Pick your <span className="text-gradient-flame">Lane</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {collections.map((c) => (
            <a
              key={c.name}
              href={c.href}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-border hover:border-primary/60 transition-all"
            >
              <img
                src={c.img}
                alt={c.name}
                loading="lazy"
                width={1024}
                height={1024}
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:to-accent/20 transition-all duration-500" />

              <div className="absolute top-5 right-5 p-2.5 rounded-full bg-flame opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                <ArrowUpRight className="h-4 w-4 text-primary-foreground" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-7">
                <div className="text-xs uppercase tracking-widest text-primary mb-2">{c.tag}</div>
                <h3 className="font-display text-4xl uppercase mb-2">{c.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{c.desc}</p>
                <div className="flex items-center justify-between text-xs uppercase tracking-wider">
                  <span className="text-muted-foreground">
                    <span className="font-display text-foreground text-base">{c.count}</span> models
                  </span>
                  <span className="text-primary group-hover:translate-x-1 transition-transform">Shop →</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
