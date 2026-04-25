import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Finish = "Metallic" | "Chrome" | "Rubber Tires";

export const FINISHES: { id: Finish; label: string; hint: string }[] = [
  { id: "Metallic", label: "Metallic", hint: "Show only metallic die-cast cars" },
  { id: "Chrome", label: "Chrome", hint: "Show only mirror-chrome plated cars" },
  { id: "Rubber Tires", label: "All", hint: "Show every car (metallic + chrome)" },
];

type Ctx = {
  finish: Finish;
  setFinish: (f: Finish) => void;
};

const FinishContext = createContext<Ctx | null>(null);

export function FinishProvider({ children }: { children: ReactNode }) {
  const [finish, setFinish] = useState<Finish>("Metallic");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("hw_finish") as Finish | null;
      if (stored && FINISHES.some((f) => f.id === stored)) setFinish(stored);
    } catch {
      /* noop */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("hw_finish", finish);
    } catch {
      /* noop */
    }
  }, [finish]);

  return <FinishContext.Provider value={{ finish, setFinish }}>{children}</FinishContext.Provider>;
}

export function useFinish() {
  const ctx = useContext(FinishContext);
  if (!ctx) throw new Error("useFinish must be used within FinishProvider");
  return ctx;
}

export const finishStyles: Record<
  Finish,
  { overlay: string; ring: string; chip: string; icon: string }
> = {
  Metallic: {
    overlay:
      "bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.18),transparent_60%)] mix-blend-overlay",
    ring: "ring-1 ring-primary/30",
    chip: "bg-primary/15 text-primary border border-primary/40",
    icon: "✦",
  },
  Chrome: {
    overlay:
      "bg-[linear-gradient(110deg,rgba(255,255,255,0.45)_0%,rgba(255,255,255,0)_30%,rgba(255,255,255,0)_60%,rgba(255,255,255,0.35)_100%)] mix-blend-screen",
    ring: "ring-1 ring-white/40",
    chip: "bg-white/10 text-foreground border border-white/40 backdrop-blur",
    icon: "◈",
  },
  "Rubber Tires": {
    overlay:
      "bg-[radial-gradient(ellipse_at_bottom,rgba(0,0,0,0.55),transparent_55%)]",
    ring: "ring-1 ring-foreground/20",
    chip: "bg-secondary text-foreground border border-border",
    icon: "◉",
  },
};
