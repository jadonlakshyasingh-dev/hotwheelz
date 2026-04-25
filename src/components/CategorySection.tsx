import { ProductCard } from "./ProductCard";
import { products, type Category } from "@/data/products";
import { useFinish } from "@/context/FinishContext";

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  category: Category;
  bg?: string;
};

export function CategorySection({ id, eyebrow, title, highlight, description, category, bg }: Props) {
  const { finish } = useFinish();
  const items = products.filter((p) => {
    if (p.series !== category) return false;
    if (finish === "Metallic") return p.material === "Metallic";
    if (finish === "Chrome") return p.material === "Chrome";
    return true; // "Rubber Tires" — show all materials
  });

  if (items.length === 0) return null;

  return (
    <section id={id} className={`relative py-24 px-6 ${bg ?? ""}`}>
      <div className="container mx-auto">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-primary mb-3">// {eyebrow}</div>
            <h2 className="font-display text-4xl md:text-5xl uppercase leading-[0.95]">
              {title} <span className="text-gradient-flame">{highlight}</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md">{description}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} compact />
          ))}
        </div>
      </div>
    </section>
  );
}
