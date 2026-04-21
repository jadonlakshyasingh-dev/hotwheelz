import { useState } from "react";
import { Send, Flame, Mail } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    setEmail("");
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="relative py-28 px-6">
      <div className="container mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-flame p-10 md:p-16 text-center shadow-flame">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 track-stripe" />
          </div>
          <div className="absolute top-6 left-6 flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <Flame
                key={i}
                className="h-6 w-6 text-primary-foreground animate-flame-flicker"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>

          <div className="relative">
            <Mail className="h-12 w-12 text-primary-foreground mx-auto mb-6" />
            <h2 className="font-display text-4xl md:text-6xl uppercase text-primary-foreground mb-4">
              Get the Drop First
            </h2>
            <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
              Join 100k+ collectors. Early access to limited drops, track tips, and exclusive
              behind-the-scenes from the workshop.
            </p>

            <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-5 py-4 rounded-md bg-background/95 text-foreground placeholder:text-muted-foreground border-2 border-transparent focus:border-background outline-none"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-background text-foreground font-display uppercase tracking-wider text-sm rounded-md hover:scale-105 transition-transform"
              >
                {sent ? "Buckled In!" : "Sign Up"}
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
