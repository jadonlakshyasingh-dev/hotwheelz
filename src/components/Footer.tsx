import { Flame, Instagram, Youtube, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-border py-14 px-6">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Flame className="h-6 w-6 text-primary animate-flame-flicker" />
              <span className="font-display text-lg tracking-widest">
                HOT<span className="text-gradient-flame">WHEELZ</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Forging fast since '68. Built for collectors. Made for kids at heart.
            </p>
          </div>

          {[
            { title: "Shop", links: ["Classics", "Supercars", "Limited", "New Arrivals"] },
            { title: "Race", links: ["Tracks", "Builder", "Tournaments", "Videos"] },
            { title: "Crew", links: ["About", "Contact", "Careers", "Press"] },
          ].map((c) => (
            <div key={c.title}>
              <h3 className="font-display text-sm uppercase tracking-widest text-primary mb-4">{c.title}</h3>
              <ul className="space-y-2">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border gap-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            © 2026 Hotwheelz Garage — All gears reserved.
          </p>
          <div className="flex gap-3">
            {[
              { Icon: Instagram, label: "Instagram" },
              { Icon: Youtube, label: "YouTube" },
              { Icon: Twitter, label: "Twitter" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary hover:bg-primary/10 transition-all"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
