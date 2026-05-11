import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Shield, ChevronLeft, Loader2, Plus, Pencil, Trash2, Package, ShoppingCart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

type Product = Database["public"]["Tables"]["products"]["Row"];
type OrderRow = Database["public"]["Tables"]["orders"]["Row"];
type OrderItemRow = Database["public"]["Tables"]["order_items"]["Row"];
type OrderWithItems = OrderRow & { order_items: OrderItemRow[] };
type OrderStatus = Database["public"]["Enums"]["order_status"];

const STATUSES: OrderStatus[] = ["pending", "paid", "fulfilled", "cancelled", "refunded"];

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin garage — HotWheelz" }] }),
  beforeLoad: async () => {
    const { data: sess } = await supabase.auth.getSession();
    if (!sess.session) throw redirect({ to: "/auth" });
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", sess.session.user.id);
    if (!roles?.some((r) => r.role === "admin")) throw redirect({ to: "/" });
  },
  component: AdminPage,
});

function AdminPage() {
  return (
    <div className="min-h-screen bg-background px-6 py-24">
      <div className="container mx-auto max-w-6xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-primary mb-6"
        >
          <ChevronLeft className="h-3 w-3" /> Back to showroom
        </Link>
        <div className="flex items-center gap-3 mb-10">
          <Shield className="h-8 w-8 text-primary" />
          <h1 className="font-display text-4xl uppercase">Admin garage</h1>
        </div>

        <Tabs defaultValue="products">
          <TabsList>
            <TabsTrigger value="products">
              <Package className="h-4 w-4 mr-2" /> Products
            </TabsTrigger>
            <TabsTrigger value="orders">
              <ShoppingCart className="h-4 w-4 mr-2" /> Orders
            </TabsTrigger>
          </TabsList>
          <TabsContent value="products" className="mt-6">
            <ProductsManager />
          </TabsContent>
          <TabsContent value="orders" className="mt-6">
            <OrdersManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// ---------------- Products ----------------

const emptyProduct = {
  id: "",
  name: "",
  series: "",
  material: "",
  description: "",
  price: 0,
  stock: 100,
  speed: 0,
  badge: "",
  img: "",
  is_active: true,
};

function ProductsManager() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<typeof emptyProduct | null>(null);
  const [isNew, setIsNew] = useState(false);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    else setItems(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    if (!editing) return;
    const payload = {
      ...editing,
      badge: editing.badge || null,
      price: Number(editing.price),
      stock: Number(editing.stock),
      speed: Number(editing.speed),
    };
    if (isNew) {
      const { error } = await supabase.from("products").insert(payload);
      if (error) return toast.error(error.message);
      toast.success("Product created");
    } else {
      const { id, ...rest } = payload;
      const { error } = await supabase.from("products").update(rest).eq("id", id);
      if (error) return toast.error(error.message);
      toast.success("Product updated");
    }
    setEditing(null);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Product deleted");
    load();
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            setIsNew(true);
            setEditing({ ...emptyProduct });
          }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-display uppercase tracking-wider text-xs rounded-md"
        >
          <Plus className="h-4 w-4" /> New product
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : items.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">No products yet.</p>
      ) : (
        <div className="border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50 text-[10px] uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="text-left p-3">Product</th>
                <th className="text-left p-3 hidden md:table-cell">Series</th>
                <th className="text-right p-3">Price</th>
                <th className="text-right p-3 hidden sm:table-cell">Stock</th>
                <th className="text-center p-3">Active</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p.id} className="border-t border-border">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <img src={p.img} alt={p.name} className="h-10 w-10 rounded object-cover" />
                      <div>
                        <div className="font-display uppercase">{p.name}</div>
                        <div className="text-xs text-muted-foreground">{p.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 hidden md:table-cell">{p.series}</td>
                  <td className="p-3 text-right font-display">${Number(p.price).toFixed(2)}</td>
                  <td className="p-3 text-right hidden sm:table-cell">{p.stock}</td>
                  <td className="p-3 text-center">
                    <span
                      className={`inline-block w-2 h-2 rounded-full ${p.is_active ? "bg-green-500" : "bg-muted-foreground"}`}
                    />
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => {
                        setIsNew(false);
                        setEditing({
                          id: p.id,
                          name: p.name,
                          series: p.series,
                          material: p.material,
                          description: p.description,
                          price: Number(p.price),
                          stock: p.stock,
                          speed: p.speed,
                          badge: p.badge ?? "",
                          img: p.img,
                          is_active: p.is_active,
                        });
                      }}
                      className="inline-flex items-center justify-center h-8 w-8 rounded hover:bg-secondary text-muted-foreground hover:text-primary"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="inline-flex items-center justify-center h-8 w-8 rounded hover:bg-secondary text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display uppercase">
              {isNew ? "New product" : "Edit product"}
            </DialogTitle>
            <DialogDescription>
              All fields except badge are required.
            </DialogDescription>
          </DialogHeader>
          {editing && (
            <form onSubmit={handleSave} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <Label>ID (slug)</Label>
                  <Input
                    required
                    disabled={!isNew}
                    value={editing.id}
                    onChange={(e) => setEditing({ ...editing, id: e.target.value })}
                  />
                </div>
                <div className="col-span-2">
                  <Label>Name</Label>
                  <Input
                    required
                    value={editing.name}
                    onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Series</Label>
                  <Input
                    required
                    value={editing.series}
                    onChange={(e) => setEditing({ ...editing, series: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Material</Label>
                  <Input
                    required
                    value={editing.material}
                    onChange={(e) => setEditing({ ...editing, material: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Price</Label>
                  <Input
                    required
                    type="number"
                    step="0.01"
                    value={editing.price}
                    onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <Label>Stock</Label>
                  <Input
                    required
                    type="number"
                    value={editing.stock}
                    onChange={(e) => setEditing({ ...editing, stock: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <Label>Speed</Label>
                  <Input
                    required
                    type="number"
                    value={editing.speed}
                    onChange={(e) => setEditing({ ...editing, speed: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <Label>Badge (optional)</Label>
                  <Input
                    value={editing.badge}
                    onChange={(e) => setEditing({ ...editing, badge: e.target.value })}
                  />
                </div>
                <div className="col-span-2">
                  <Label>Image URL</Label>
                  <Input
                    required
                    value={editing.img}
                    onChange={(e) => setEditing({ ...editing, img: e.target.value })}
                  />
                </div>
                <div className="col-span-2">
                  <Label>Description</Label>
                  <Textarea
                    rows={3}
                    value={editing.description}
                    onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                  />
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <input
                    id="active"
                    type="checkbox"
                    checked={editing.is_active}
                    onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })}
                  />
                  <Label htmlFor="active">Active (visible in store)</Label>
                </div>
              </div>
              <DialogFooter>
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="px-4 py-2 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-primary-foreground font-display uppercase tracking-wider text-xs rounded-md"
                >
                  Save
                </button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ---------------- Orders ----------------

function OrdersManager() {
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*, order_items(*)")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    else setOrders((data ?? []) as OrderWithItems[]);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function updateStatus(id: string, status: OrderStatus) {
    const { error } = await supabase.from("orders").update({ status }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success(`Order marked ${status}`);
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  }

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );

  if (orders.length === 0)
    return <p className="text-center text-muted-foreground py-12">No orders yet.</p>;

  return (
    <div className="space-y-3">
      {orders.map((o) => (
        <article key={o.id} className="border border-border rounded-xl bg-card p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Order · {new Date(o.created_at).toLocaleString()}
              </div>
              <div className="font-display text-sm">{o.id.slice(0, 8).toUpperCase()}</div>
              <div className="text-xs text-muted-foreground">
                {o.shipping_name ?? "—"} · {o.shipping_email ?? "—"}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="font-display text-lg text-gradient-flame">
                ${Number(o.total).toFixed(2)}
              </div>
              <Select
                value={o.status}
                onValueChange={(v) => updateStatus(o.id, v as OrderStatus)}
              >
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUSES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <button
                onClick={() => setExpanded(expanded === o.id ? null : o.id)}
                className="text-xs uppercase tracking-wider text-muted-foreground hover:text-primary"
              >
                {expanded === o.id ? "Hide" : "Items"}
              </button>
            </div>
          </div>
          {expanded === o.id && (
            <ul className="mt-4 space-y-2 border-t border-border pt-3">
              {o.order_items?.map((it) => (
                <li key={it.id} className="flex items-center gap-3 text-sm">
                  <img src={it.product_img} alt="" className="h-10 w-10 rounded object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="font-display uppercase truncate">{it.product_name}</div>
                    <div className="text-[10px] uppercase text-muted-foreground">
                      {it.product_series}
                      {it.finish && ` · ${it.finish}`}
                    </div>
                  </div>
                  <div className="text-xs">×{it.qty}</div>
                  <div className="font-display w-20 text-right">
                    ${Number(it.line_total).toFixed(2)}
                  </div>
                </li>
              ))}
              {o.shipping_address && (
                <li className="text-xs text-muted-foreground pt-2 border-t border-border">
                  Ship to: {o.shipping_address}, {o.shipping_city} {o.shipping_zip}{" "}
                  {o.shipping_country}
                </li>
              )}
            </ul>
          )}
        </article>
      ))}
    </div>
  );
}
