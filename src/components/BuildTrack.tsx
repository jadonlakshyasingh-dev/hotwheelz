import { useState } from "react";
import track from "@/assets/track.jpg";
import { Plus, Minus, Sparkles } from "lucide-react";

const pieces = [
  { name: "Loop", icon: "◯", boost: 12 },
  { name: "Ramp", icon: "◢", boost: 18 },
  { name: "Curve", icon: "⌒", boost: 6 },
  { name: "Booster", icon: "⚡", boost: 24 },
];

export function BuildTrack() {
  const [counts, setCounts] = useState<Record<string, number>>({
    Loop: 1, Ramp: 2, Curve: 3, Booster: 0,
  });

  const update = (n: string, d: number) =>
    setCounts((c) => ({ ...c, [n]: Math.max(0, Math.min(9, (c[n] || 0) + d)) }));

  const totalSpeed = Object.entries(counts).reduce(
    (acc, [k, v]) => acc + v * (pieces.find((p) => p.name === k)?.boost || 0),
    60
  );
  const totalPieces = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <section id="track" className="relative py-28 px-6 overflow-hidden">
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative rounded-2xl overflow-hidden border border-primary/30 shadow-flame">
          <img
            src={track}
            alt="Hot Wheels orange race track loop with toy car"
            loading="lazy"
            width={1600}
            height={900}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-background/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest text-primary">Your Track</div>
              <div className="font-display text-4xl">{totalPieces} pieces</div>
            </div>
            <div className="text-right">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Top Speed</div>
              <div className="font-display text-5xl text-gradient-flame">{totalSpeed}<span className="text-base">mph</span></div>
            </div>
          </div>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-primary mb-3">// Builder</div>
          <h2 className="font-display text-5xl md:text-6xl uppercase mb-4">
            Build your <span className="text-gradient-flame">Track</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            Mix loops, ramps, and boosters. Every piece adds raw speed. Tap below to assemble.
          </p>

          <div className="space-y-4">
            {pieces.map((p) => (
              <div
                key={p.name}
                className="flex items-center justify-between bg-card border border-border rounded-xl p-5 hover:border-primary/60 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-flame flex items-center justify-center text-2xl text-primary-foreground">
                    {p.icon}
                  </div>
                  <div>
                    <div className="font-display text-lg uppercase">{p.name}</div>
                    <div className="text-xs text-muted-foreground">+{p.boost} mph each</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => update(p.name, -1)}
                    className="h-9 w-9 rounded-full border border-border hover:border-primary hover:text-primary transition-all flex items-center justify-center"
                    aria-label={`Remove ${p.name}`}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <div className="font-display text-2xl w-8 text-center">{counts[p.name]}</div>
                  <button
                    onClick={() => update(p.name, 1)}
                    className="h-9 w-9 rounded-full bg-flame text-primary-foreground hover:scale-110 transition-transform flex items-center justify-center"
                    aria-label={`Add ${p.name}`}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-8 w-full inline-flex items-center justify-center gap-2 py-4 bg-flame text-primary-foreground font-display uppercase tracking-wider text-sm rounded-md shadow-flame hover:scale-[1.02] transition-transform">
            <Sparkles className="h-4 w-4" />
            Launch the run
          </button>
        </div>
      </div>
    </section>
  );
}
