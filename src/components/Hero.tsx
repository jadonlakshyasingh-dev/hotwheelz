import heroCar from "@/assets/hero-car.jpg";
import { SpeedLines } from "./SpeedLines";
import { ArrowRight, Zap } from "lucide-react";

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-center overflow-hidden pt-24">
      <div className="absolute inset-0">
        <img
          src={heroCar}
          alt="Die-cast muscle car blasting through neon flames on an orange Hot Wheels track"
          className="h-full w-full object-cover"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
      </div>

      <SpeedLines />

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-7 animate-drift-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-primary/40">
            <Zap className="h-4 w-4 text-primary animate-flame-flicker" />
            <span className="text-xs uppercase tracking-widest">Drop 2026 — Live Now</span>
          </div>

          <h1 className="font-display text-6xl md:text-7xl lg:text-8xl leading-[0.9] uppercase">
            Unleash<br />
            the <span className="text-gradient-flame animate-flame-flicker inline-block">Speed</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-md">
            Premium die-cast machines built for collectors and unleashed for kids.
            Faster tracks. Bolder cars. Pure adrenaline.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#featured"
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-flame text-primary-foreground font-display uppercase tracking-wider text-sm rounded-md shadow-flame hover:scale-105 transition-transform animate-pulse-glow"
            >
              Shop the drop
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#limited"
              className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-primary/60 text-foreground font-display uppercase tracking-wider text-sm rounded-md hover:bg-primary/10 hover:border-primary transition-all"
            >
              Shop Limited
            </a>
          </div>

          <div className="flex gap-8 pt-6 border-t border-border/50">
            {[
              { n: "500+", l: "Models" },
              { n: "60", l: "Years" },
              { n: "1B+", l: "Sold" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-3xl text-gradient-flame">{s.n}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Track stripe */}
      <div className="absolute bottom-0 left-0 right-0 h-3 track-stripe opacity-80" />
    </section>
  );
}
