import { Flame, Star, ShoppingBag, Zap } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { finishStyles } from "@/context/FinishContext";
import { toast } from "sonner";
import type { Product } from "@/data/products";

type Props = {
  product: Product;
  compact?: boolean;
};

export function ProductCard({ product, compact = false }: Props) {
  const { addItem, setOpen } = useCart();
  // Each card uses its own product material for its visual treatment,
  // so chrome cars always look chrome and metallic cars always look metallic.
  const cardFinish = product.material;
  const fx = finishStyles[cardFinish];

  const add = () => {
    addItem({
      id: product.id,
      name: product.name,
      series: product.series,
      price: product.price,
      img: product.img,
      finish: cardFinish,
    });
    toast.success(`${product.name} added to garage`, {
      description: `${cardFinish} • $${product.price.toFixed(2)} • ${product.series}`,
    });
  };

  const buyNow = () => {
    addItem({
      id: product.id,
      name: product.name,
      series: product.series,
      price: product.price,
      img: product.img,
      finish: cardFinish,
    });
    setOpen(true);
  };

  return (
    <article className={`group relative bg-card border border-border rounded-2xl overflow-hidden hover-lift flex flex-col transition-all ${fx.ring}`}>
      {product.badge && (
        <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 px-3 py-1 bg-flame text-primary-foreground text-[10px] font-display uppercase tracking-widest rounded-full">
          <Flame className="h-3 w-3" />
          {product.badge}
        </div>
      )}

      {/* Material chip — reflects this product's own finish */}
      <div
        className={`absolute top-4 right-4 z-10 inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-display uppercase tracking-widest rounded-full ${fx.chip}`}
        title={`Material: ${cardFinish}`}
      >
        <span aria-hidden>{fx.icon}</span>
        {cardFinish}
      </div>

      <div className={`${compact ? "aspect-square" : "aspect-[4/3]"} overflow-hidden bg-gradient-to-br from-secondary to-background relative`}>
        <img
          src={product.img}
          alt={`${product.name} — ${cardFinish} finish`}
          loading="lazy"
          width={1024}
          height={768}
          className="h-full w-full object-cover group-hover:scale-110 group-hover:-rotate-2 transition-transform duration-700"
        />
        {/* Finish overlay treatment */}
        <div className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${fx.overlay}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
      </div>

      <div className={`${compact ? "p-4 space-y-3" : "p-6 space-y-4"} flex-1 flex flex-col`}>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="text-[10px] uppercase tracking-widest text-primary">{product.series}</div>
            <h3 className={`font-display ${compact ? "text-lg" : "text-2xl"} uppercase mt-1 truncate`}>
              {product.name}
            </h3>
          </div>
          <div className={`font-display ${compact ? "text-lg" : "text-2xl"} text-gradient-flame whitespace-nowrap`}>
            ${product.price}
          </div>
        </div>

        {!compact && (
          <p className="text-xs text-muted-foreground leading-relaxed">{product.desc}</p>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, k) => (
              <Star key={k} className="h-3 w-3 fill-primary text-primary" />
            ))}
          </div>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <span aria-hidden className="text-primary">{fx.icon}</span>
              {cardFinish}
            </span>
            <span className="text-border">·</span>
            <span>
              Top <span className="text-foreground font-display">{product.speed}</span> mph
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-auto">
          <button
            type="button"
            onClick={add}
            className="inline-flex items-center justify-center gap-1.5 py-2.5 border border-primary/40 hover:bg-primary/10 hover:border-primary font-display uppercase tracking-wider text-[11px] rounded-md transition-all"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            Add
          </button>
          <button
            type="button"
            onClick={buyNow}
            className="inline-flex items-center justify-center gap-1.5 py-2.5 bg-flame text-primary-foreground font-display uppercase tracking-wider text-[11px] rounded-md hover:scale-[1.03] transition-transform shadow-flame"
          >
            <Zap className="h-3.5 w-3.5" />
            Buy
          </button>
        </div>
      </div>
    </article>
  );
}
