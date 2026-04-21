import { Flame, Trophy, Users, Rocket } from "lucide-react";

const stats = [
  { icon: Flame, n: "60+", l: "Years of Speed" },
  { icon: Trophy, n: "500", l: "Award-Winning Models" },
  { icon: Users, n: "10M", l: "Collectors Worldwide" },
  { icon: Rocket, n: "1B+", l: "Cars Sold" },
];

export function About() {
  return (
    <section id="about" className="relative py-28 px-6 bg-secondary/30 overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-flame blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent blur-3xl" />
      </div>

      <div className="container mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-primary mb-3">// Our Story</div>
            <h2 className="font-display text-5xl md:text-6xl uppercase mb-6 leading-[0.95]">
              Born in the<br />
              <span className="text-gradient-flame">Fast Lane.</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
              We don't just build toys — we build <span className="text-foreground font-semibold">obsessions</span>.
              Since 1968, our die-cast machines have been melting carpets, soaring through living
              rooms, and igniting imaginations from coast to coast.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Every car is forged with collector-grade detail and built to take a beating. Whether
              you're 8 or 80 — strap in. The race never stops.
            </p>

            <div className="flex gap-4 mt-8">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-flame text-primary-foreground font-display uppercase tracking-wider text-xs rounded-md hover:scale-105 transition-transform"
              >
                Join the Crew
              </a>
              <a
                href="#collections"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border hover:border-primary font-display uppercase tracking-wider text-xs rounded-md transition-all"
              >
                Explore Cars
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div
                key={s.l}
                className="group p-7 bg-card border border-border rounded-xl hover:border-primary/60 hover-lift relative overflow-hidden"
              >
                <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-flame opacity-0 group-hover:opacity-20 blur-2xl transition-opacity" />
                <s.icon className="h-8 w-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <div className="font-display text-4xl text-gradient-flame mb-1">{s.n}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
