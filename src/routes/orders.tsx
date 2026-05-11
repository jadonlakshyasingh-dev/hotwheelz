import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Package, ChevronLeft, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type OrderRow = Database["public"]["Tables"]["orders"]["Row"];
type OrderItemRow = Database["public"]["Tables"]["order_items"]["Row"];
type OrderWithItems = OrderRow & { order_items: OrderItemRow[] };

export const Route = createFileRoute("/orders")({
  head: () => ({
    meta: [{ title: "My orders — HotWheelz" }],
  }),
  beforeLoad: async () => {
    const { data } = await supabase.auth.getSession();
    if (!data.session) throw redirect({ to: "/auth" });
  },
  component: OrdersPage,
});

const statusStyles: Record<string, string> = {
  pending: "bg-secondary text-foreground border-border",
  paid: "bg-primary/10 text-primary border-primary/30",
  fulfilled: "bg-green-500/10 text-green-500 border-green-500/30",
  cancelled: "bg-destructive/10 text-destructive border-destructive/30",
  refunded: "bg-muted text-muted-foreground border-border",
};

function OrdersPage() {
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(*)")
        .order("created_at", { ascending: false });
      if (!error && data) setOrders(data as OrderWithItems[]);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="min-h-screen bg-background px-6 py-24">
      <div className="container mx-auto max-w-4xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-primary mb-6"
        >
          <ChevronLeft className="h-3 w-3" /> Back to showroom
        </Link>

        <div className="flex items-center gap-3 mb-10">
          <Package className="h-8 w-8 text-primary" />
          <h1 className="font-display text-4xl uppercase">My orders</h1>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : orders.length === 0 ? (
          <div className="border border-dashed border-border rounded-2xl p-12 text-center">
            <p className="text-muted-foreground mb-4">No orders yet.</p>
            <Link
              to="/"
              className="inline-block px-5 py-2.5 bg-primary text-primary-foreground font-display uppercase tracking-wider text-xs rounded-md"
            >
              Start shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((o) => (
              <article
                key={o.id}
                className="border border-border rounded-xl bg-card p-5"
              >
                <header className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      Order
                    </div>
                    <div className="font-display text-sm">
                      {o.id.slice(0, 8).toUpperCase()}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {new Date(o.created_at).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-display border ${statusStyles[o.status] ?? statusStyles.pending}`}
                    >
                      {o.status}
                    </span>
                    <div className="font-display text-lg text-gradient-flame mt-2">
                      ${Number(o.total).toFixed(2)}
                    </div>
                  </div>
                </header>
                <ul className="space-y-2 border-t border-border pt-3">
                  {o.order_items?.map((it) => (
                    <li
                      key={it.id}
                      className="flex items-center gap-3 text-sm"
                    >
                      <img
                        src={it.product_img}
                        alt={it.product_name}
                        className="h-12 w-12 rounded object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] uppercase tracking-widest text-primary">
                          {it.product_series}
                        </div>
                        <div className="font-display uppercase truncate">
                          {it.product_name}
                          {it.finish && (
                            <span className="ml-2 text-[10px] text-muted-foreground">
                              · {it.finish}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        ×{it.qty}
                      </div>
                      <div className="font-display w-20 text-right">
                        ${Number(it.line_total).toFixed(2)}
                      </div>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
