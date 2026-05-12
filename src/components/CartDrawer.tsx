import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
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
import { Minus, Plus, Trash2, ShoppingBag, CreditCard, Flame, CheckCircle2, Sparkles, Wallet as WalletIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useCart } from "@/context/CartContext";
import { finishStyles, type Finish } from "@/context/FinishContext";
import { toast } from "sonner";

export function CartDrawer() {
  const { items, isOpen, setOpen, updateQty, removeItem, subtotal, count, clear } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [payMethod, setPayMethod] = useState<"card" | "wallet">("card");
  const [wallet, setWallet] = useState<{ id: string; balance: number; is_connected: boolean; bank_name: string | null; bank_account_last4: string | null } | null>(null);
  const [walletLoading, setWalletLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    card: "",
    exp: "",
    cvc: "",
  });

  // Load wallet when checkout opens
  useEffect(() => {
    if (!checkoutOpen || !user) return;
    setWalletLoading(true);
    supabase
      .from("wallets")
      .select("id,balance,is_connected,bank_name,bank_account_last4")
      .eq("user_id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        setWallet(data as typeof wallet);
        setWalletLoading(false);
      });
  }, [checkoutOpen, user]);

  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 4.99;
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = +(subtotal + shipping + tax).toFixed(2);

  // Group items by finish for the checkout summary
  const finishBreakdown = items.reduce<Record<string, { qty: number; total: number }>>(
    (acc, it) => {
      const key = it.finish ?? "Standard";
      if (!acc[key]) acc[key] = { qty: 0, total: 0 };
      acc[key].qty += it.qty;
      acc[key].total += it.qty * it.price;
      return acc;
    },
    {},
  );

  const submitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Sign in to place your order");
      setCheckoutOpen(false);
      setOpen(false);
      navigate({ to: "/auth" });
      return;
    }
    if (items.length === 0) return;
    if (payMethod === "wallet") {
      if (!wallet?.is_connected) {
        toast.error("Connect a bank account in your wallet first");
        return;
      }
      if (Number(wallet.balance) < total) {
        toast.error("Insufficient wallet balance. Top up to continue.");
        return;
      }
    }
    setSubmitting(true);
    try {
      const { data: orderRow, error: orderErr } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          status: "paid",
          subtotal,
          shipping,
          tax,
          total,
          currency: "USD",
          shipping_name: form.name,
          shipping_email: form.email,
          shipping_address: form.address,
          shipping_city: form.city,
          shipping_zip: form.zip,
          shipping_country: "US",
        })
        .select()
        .single();
      if (orderErr || !orderRow) throw orderErr ?? new Error("Failed to create order");

      const itemRows = items.map((it) => ({
        order_id: orderRow.id,
        product_id: it.id,
        product_name: it.name,
        product_series: it.series,
        product_img: it.img,
        finish: it.finish ?? null,
        qty: it.qty,
        unit_price: it.price,
        line_total: +(it.price * it.qty).toFixed(2),
      }));
      const { error: itemsErr } = await supabase.from("order_items").insert(itemRows);
      if (itemsErr) throw itemsErr;

      // Wallet debit
      if (payMethod === "wallet" && wallet) {
        const newBalance = +(Number(wallet.balance) - total).toFixed(2);
        const { error: wErr } = await supabase
          .from("wallets")
          .update({ balance: newBalance })
          .eq("user_id", user.id);
        if (wErr) throw wErr;
        await supabase.from("wallet_transactions").insert({
          wallet_id: wallet.id,
          user_id: user.id,
          type: "purchase",
          amount: total,
          balance_after: newBalance,
          description: `Order ${orderRow.id.slice(0, 8).toUpperCase()}`,
          order_id: orderRow.id,
        });
      }

      setOrderId(orderRow.id.slice(0, 8).toUpperCase());
      setCheckoutOpen(false);
      setConfirmOpen(true);
      clear();
      setOpen(false);
      toast.success("Order placed!", {
        description: `Confirmation sent to ${form.email}`,
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Could not place order";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setOpen}>
        <SheetContent className="w-full sm:max-w-md flex flex-col bg-background border-l border-border p-0">
          <SheetHeader className="p-6 border-b border-border text-left">
            <SheetTitle className="font-display text-2xl uppercase flex items-center gap-2">
              <Flame className="h-5 w-5 text-primary" />
              Your Garage
            </SheetTitle>
            <SheetDescription className="text-xs uppercase tracking-widest text-muted-foreground">
              {count} {count === 1 ? "ride" : "rides"} ready to launch
            </SheetDescription>
          </SheetHeader>

          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 gap-4">
              <ShoppingBag className="h-14 w-14 text-muted-foreground" />
              <p className="text-muted-foreground">Your garage is empty.</p>
              <button
                onClick={() => setOpen(false)}
                className="px-5 py-2.5 bg-flame text-primary-foreground font-display uppercase tracking-wider text-xs rounded-md"
              >
                Shop the drop
              </button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.map((it) => {
                  const fStyle = it.finish ? finishStyles[it.finish as Finish] : null;
                  return (
                    <div
                      key={`${it.id}::${it.finish ?? "default"}`}
                      className={`flex gap-4 bg-card border border-border rounded-xl p-3 ${fStyle?.ring ?? ""}`}
                    >
                      <div className="relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden">
                        <img src={it.img} alt={it.name} className="h-full w-full object-cover" />
                        {fStyle && (
                          <div
                            className={`pointer-events-none absolute inset-0 ${fStyle.overlay}`}
                            aria-hidden
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] uppercase tracking-widest text-primary">
                          {it.series}
                        </div>
                        <div className="font-display uppercase text-sm truncate">{it.name}</div>
                        {it.finish && fStyle && (
                          <div
                            className={`mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-widest font-display ${fStyle.chip}`}
                          >
                            <span>{fStyle.icon}</span>
                            {it.finish}
                          </div>
                        )}
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-gradient-flame font-display">
                            ${(it.price * it.qty).toFixed(2)}
                          </span>
                          {it.qty > 1 && (
                            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                              ${it.price.toFixed(2)} ea
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQty(it.id, it.qty - 1, it.finish)}
                              className="h-7 w-7 rounded-full border border-border hover:border-primary hover:text-primary flex items-center justify-center"
                              aria-label="Decrease"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="font-display w-5 text-center text-sm">{it.qty}</span>
                            <button
                              onClick={() => updateQty(it.id, it.qty + 1, it.finish)}
                              className="h-7 w-7 rounded-full bg-flame text-primary-foreground flex items-center justify-center hover:scale-110 transition-transform"
                              aria-label="Increase"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(it.id, it.finish)}
                            className="text-muted-foreground hover:text-destructive p-1"
                            aria-label="Remove"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <SheetFooter className="border-t border-border p-6 flex-col gap-3 sm:flex-col">
                {Object.keys(finishBreakdown).length > 0 && (
                  <div className="w-full rounded-lg border border-border bg-card/50 p-3">
                    <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                      <Sparkles className="h-3 w-3 text-primary" />
                      Finish breakdown
                    </div>
                    <div className="space-y-1">
                      {Object.entries(finishBreakdown).map(([f, info]) => {
                        const style = f in finishStyles ? finishStyles[f as Finish] : null;
                        return (
                          <div key={f} className="flex items-center justify-between text-xs">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-display uppercase tracking-wider ${
                                style?.chip ?? "bg-secondary text-foreground border border-border"
                              }`}
                            >
                              {style && <span>{style.icon}</span>}
                              {f}
                              <span className="text-muted-foreground normal-case tracking-normal ml-1">
                                ×{info.qty}
                              </span>
                            </span>
                            <span className="font-display">${info.total.toFixed(2)}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                <div className="w-full space-y-1.5 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-display text-lg pt-2 border-t border-border">
                    <span>Total</span>
                    <span className="text-gradient-flame">${total.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={() => setCheckoutOpen(true)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-flame text-primary-foreground font-display uppercase tracking-wider text-sm rounded-md shadow-flame hover:scale-[1.02] transition-transform"
                >
                  <CreditCard className="h-4 w-4" />
                  Checkout
                </button>
                <button
                  onClick={clear}
                  className="text-xs uppercase tracking-wider text-muted-foreground hover:text-destructive"
                >
                  Clear garage
                </button>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>

      <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl uppercase flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              Checkout
            </DialogTitle>
            <DialogDescription>
              Demo checkout — no real payment is processed.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={submitOrder} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  required
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  required
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="zip">ZIP</Label>
                <Input
                  id="zip"
                  required
                  value={form.zip}
                  onChange={(e) => setForm({ ...form, zip: e.target.value })}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="card">Card number</Label>
                <Input
                  id="card"
                  required
                  inputMode="numeric"
                  placeholder="4242 4242 4242 4242"
                  value={form.card}
                  onChange={(e) => setForm({ ...form, card: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="exp">Expiry</Label>
                <Input
                  id="exp"
                  required
                  placeholder="MM/YY"
                  value={form.exp}
                  onChange={(e) => setForm({ ...form, exp: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="cvc">CVC</Label>
                <Input
                  id="cvc"
                  required
                  placeholder="123"
                  value={form.cvc}
                  onChange={(e) => setForm({ ...form, cvc: e.target.value })}
                />
              </div>
            </div>

            <div className="bg-secondary/50 border border-border rounded-lg p-4 space-y-3 text-sm">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                  Order items
                </div>
                <ul className="space-y-1.5">
                  {items.map((it) => {
                    const style = it.finish ? finishStyles[it.finish as Finish] : null;
                    return (
                      <li
                        key={`sum-${it.id}::${it.finish ?? "default"}`}
                        className="flex items-center justify-between gap-3"
                      >
                        <span className="flex items-center gap-2 min-w-0">
                          <span className="font-display uppercase text-xs truncate">
                            {it.name}
                          </span>
                          <span className="text-[10px] text-muted-foreground">×{it.qty}</span>
                          {it.finish && style && (
                            <span
                              className={`hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-display ${style.chip}`}
                            >
                              <span>{style.icon}</span>
                              {it.finish}
                            </span>
                          )}
                        </span>
                        <span className="font-display whitespace-nowrap">
                          ${(it.price * it.qty).toFixed(2)}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {Object.keys(finishBreakdown).length > 0 && (
                <div className="border-t border-border pt-3">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                    <Sparkles className="h-3 w-3 text-primary" />
                    By finish
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {Object.entries(finishBreakdown).map(([f, info]) => {
                      const style = f in finishStyles ? finishStyles[f as Finish] : null;
                      return (
                        <span
                          key={`sum-f-${f}`}
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-display ${
                            style?.chip ?? "bg-secondary text-foreground border border-border"
                          }`}
                        >
                          {style && <span>{style.icon}</span>}
                          {f}
                          <span className="text-muted-foreground normal-case tracking-normal">
                            ×{info.qty} · ${info.total.toFixed(2)}
                          </span>
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="border-t border-border pt-3 space-y-1">
                <div className="flex justify-between text-muted-foreground">
                  <span>Items ({count})</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-display text-lg pt-2 border-t border-border">
                  <span>Total</span>
                  <span className="text-gradient-flame">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <DialogFooter>
              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-flame text-primary-foreground font-display uppercase tracking-wider text-sm rounded-md shadow-flame hover:scale-[1.02] transition-transform disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {submitting ? "Processing…" : `Pay $${total.toFixed(2)}`}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader>
            <div className="mx-auto h-16 w-16 rounded-full bg-flame flex items-center justify-center mb-2">
              <CheckCircle2 className="h-8 w-8 text-primary-foreground" />
            </div>
            <DialogTitle className="font-display text-3xl uppercase text-center">
              Order <span className="text-gradient-flame">Launched</span>
            </DialogTitle>
            <DialogDescription className="text-center">
              Your rides are revving up. Confirmation:
              <br />
              <span className="font-display text-foreground tracking-widest">{orderId}</span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button
              onClick={() => setConfirmOpen(false)}
              className="w-full py-3 bg-flame text-primary-foreground font-display uppercase tracking-wider text-sm rounded-md"
            >
              Keep racing
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
