import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Flame, ShoppingBag, Zap, Star, Gauge, Sparkles, Minus, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { finishStyles } from "@/context/FinishContext";
import { toast } from "sonner";
import type { Product } from "@/data/products";

type Props = {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  intent: "add" | "buy";
};

export function CarPreviewDialog({ product, open, onOpenChange, intent }: Props) {
  const { addItem, setOpen: setCartOpen } = useCart();
  const { format } = useCurrency();
  const [qty, setQty] = useState(1);

  if (!product) return null;

  const fx = finishStyles[product.material];

  const handleConfirm = () => {
    for (let i = 0; i < qty; i++) {
      addItem({
        id: product.id,
        name: product.name,
        series: product.series,
        price: product.price,
        img: product.img,
        finish: product.material,
      });
    }
    onOpenChange(false);
    setQty(1);

    if (intent === "buy") {
      setCartOpen(true);
    } else {
      toast.success(`${product.name} added to garage`, {
        description: `${qty} × ${product.material} • ${format(product.price * qty)}`,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { onOpenChange(o); if (!o) setQty(1); }}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden bg-card border-border">
        <div className="grid md:grid-cols-2">
          {/* Image side */}
          <div className={`relative aspect-square md:aspect-auto bg-gradient-to-br from-secondary to-background overflow-hidden ${fx.ring}`}>
            {product.badge && (
              <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 px-3 py-1 bg-flame text-primary-foreground text-[10px] font-display uppercase tracking-widest rounded-full">
                <Flame className="h-3 w-3" />
                {product.badge}
              </div>
            )}
            <div
              className={`absolute top-4 right-4 z-10 inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-display uppercase tracking-widest rounded-full ${fx.chip}`}
            >
              <span aria-hidden>{fx.icon}</span>
              {product.material}
            </div>
            <img
              src={product.img}
              alt={`${product.name} — ${product.material} finish preview`}
              className="h-full w-full object-cover"
            />
            <div className={`pointer-events-none absolute inset-0 ${fx.overlay}`} />
          </div>

          {/* Details side */}
          <div className="p-6 md:p-8 flex flex-col gap-4">
            <DialogHeader className="space-y-2 text-left">
              <div className="text-[10px] uppercase tracking-widest text-primary">{product.series}</div>
              <DialogTitle className="font-display text-3xl uppercase leading-tight">
                {product.name}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
                {product.desc}
              </DialogDescription>
            </DialogHeader>

            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, k) => (
                <Star key={k} className="h-3.5 w-3.5 fill-primary text-primary" />
              ))}
              <span className="ml-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                Collector rated
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg border border-border p-3">
                <div className="flex items-center gap-1.5 text-muted-foreground uppercase tracking-wider text-[10px]">
                  <Gauge className="h-3 w-3" /> Top speed
                </div>
                <div className="font-display text-lg mt-1">{product.speed} <span className="text-xs text-muted-foreground">mph</span></div>
              </div>
              <div className="rounded-lg border border-border p-3">
                <div className="flex items-center gap-1.5 text-muted-foreground uppercase tracking-wider text-[10px]">
                  <Sparkles className="h-3 w-3" /> Finish
                </div>
                <div className="font-display text-lg mt-1">{product.material}</div>
              </div>
            </div>

            <div className="flex items-end justify-between pt-2 border-t border-border">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Price</div>
                <div className="font-display text-3xl text-gradient-flame">
                  {format(product.price * qty)}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="h-9 w-9 inline-flex items-center justify-center border border-border rounded-md hover:bg-secondary"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="font-display text-lg w-8 text-center">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.min(99, q + 1))}
                  className="h-9 w-9 inline-flex items-center justify-center border border-border rounded-md hover:bg-secondary"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleConfirm}
              className={`mt-2 inline-flex items-center justify-center gap-2 py-3 font-display uppercase tracking-wider text-sm rounded-md transition-all ${
                intent === "buy"
                  ? "bg-flame text-primary-foreground hover:scale-[1.02] shadow-flame"
                  : "border border-primary/40 hover:bg-primary/10 hover:border-primary"
              }`}
            >
              {intent === "buy" ? (
                <>
                  <Zap className="h-4 w-4" /> Confirm & Checkout
                </>
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4" /> Confirm — Add to Garage
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
            >
              Keep browsing
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
