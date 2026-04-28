import { Link } from "@tanstack/react-router";
import { Flame } from "lucide-react";
import logo from "@/assets/hotwheelz-logo.png";
import type { ReactNode } from "react";

export function AuthShell({
  eyebrow,
  children,
}: {
  eyebrow: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background relative overflow-hidden perspective-scene">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(0.68_0.24_32/0.18),transparent_60%),radial-gradient(circle_at_80%_80%,oklch(0.62_0.27_27/0.14),transparent_55%)] pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 grid-floor opacity-50" />

      <div className="relative w-full max-w-md">
        <Link to="/" className="flex flex-col items-center mb-8 group">
          <div className="glow-ring rounded-full">
            <img
              src={logo}
              alt="HotWheelz"
              width={1264}
              height={848}
              className="h-24 w-auto drop-shadow-[0_0_30px_oklch(0.68_0.24_32/0.45)] group-hover:scale-105 transition-transform"
            />
          </div>
          <p className="mt-3 text-xs uppercase tracking-[0.4em] text-muted-foreground inline-flex items-center gap-2">
            <Flame className="h-3 w-3 text-primary" />
            {eyebrow}
          </p>
        </Link>

        <div className="card-3d backdrop-blur border border-border rounded-2xl p-6 shadow-2xl shadow-primary/10">
          {children}
        </div>

        <Link
          to="/"
          className="block text-center text-xs text-muted-foreground hover:text-primary mt-6 uppercase tracking-[0.3em]"
        >
          ← Back to showroom
        </Link>
      </div>
    </div>
  );
}

export function GoogleButton({
  loading,
  onClick,
  label,
}: {
  loading: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="w-full inline-flex items-center justify-center gap-3 py-2.5 rounded-md border border-border bg-card hover:border-primary hover:bg-secondary/40 transition-all font-display uppercase tracking-wider text-xs disabled:opacity-50"
    >
      <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
        <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 35.5 24 35.5c-6.4 0-11.5-5.1-11.5-11.5S17.6 12.5 24 12.5c2.9 0 5.6 1.1 7.7 2.9l5.7-5.7C33.6 6.4 29 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5 43.5 34.8 43.5 24c0-1.2-.1-2.4-.4-3.5z" />
        <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.3 19 12.5 24 12.5c2.9 0 5.6 1.1 7.7 2.9l5.7-5.7C33.6 6.4 29 4.5 24 4.5 16.3 4.5 9.7 8.9 6.3 14.7z" />
        <path fill="#4CAF50" d="M24 43.5c5 0 9.5-1.9 12.9-5l-6-5c-2 1.4-4.4 2.2-6.9 2.2-5.3 0-9.7-3.1-11.3-7.5l-6.6 5C9.7 39.1 16.3 43.5 24 43.5z" />
        <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.5l6 5c4.2-3.9 6.7-9.6 6.7-16 0-1.2-.1-2.4-.4-3.5z" />
      </svg>
      {loading ? "Connecting…" : label}
    </button>
  );
}
