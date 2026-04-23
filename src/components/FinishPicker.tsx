import { FINISHES, useFinish } from "@/context/FinishContext";
import { Sparkles } from "lucide-react";

type Props = {
  variant?: "default" | "compact";
  className?: string;
};

export function FinishPicker({ variant = "default", className = "" }: Props) {
  const { finish, setFinish } = useFinish();
  const isCompact = variant === "compact";

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full border border-border bg-card/60 backdrop-blur p-1 ${className}`}
      role="radiogroup"
      aria-label="Finish"
    >
      {!isCompact && (
        <span className="hidden md:inline-flex items-center gap-1 pl-2 pr-1 text-[10px] uppercase tracking-widest text-muted-foreground">
          <Sparkles className="h-3 w-3 text-primary" />
          Finish
        </span>
      )}
      {FINISHES.map((f) => {
        const active = finish === f.id;
        return (
          <button
            key={f.id}
            type="button"
            role="radio"
            aria-checked={active}
            title={f.hint}
            onClick={() => setFinish(f.id)}
            className={`px-2.5 py-1 rounded-full text-[10px] font-display uppercase tracking-wider transition-all whitespace-nowrap ${
              active
                ? "bg-flame text-primary-foreground shadow-flame"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {f.label}
          </button>
        );
      })}
    </div>
  );
}
