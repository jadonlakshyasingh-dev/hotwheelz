import { useEffect, useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Wallet as WalletIcon, Banknote, Plus, ArrowDownCircle, ArrowUpCircle, RotateCcw, Link2, Unlink } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/wallet")({
  component: WalletPage,
  head: () => ({
    meta: [
      { title: "Wallet — Hotwheelz" },
      { name: "description", content: "Connect your bank and pay from your Hotwheelz wallet." },
    ],
  }),
});

type Wallet = {
  id: string;
  balance: number;
  currency: string;
  bank_name: string | null;
  bank_account_last4: string | null;
  bank_holder_name: string | null;
  is_connected: boolean;
};

type Txn = {
  id: string;
  type: "deposit" | "purchase" | "refund";
  amount: number;
  balance_after: number;
  description: string | null;
  created_at: string;
};

function WalletPage() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [txns, setTxns] = useState<Txn[]>([]);
  const [loading, setLoading] = useState(true);
  const [connectOpen, setConnectOpen] = useState(false);
  const [topupAmount, setTopupAmount] = useState("");
  const [bank, setBank] = useState({ holder: "", bank: "", account: "", routing: "" });
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) navigate({ to: "/auth" });
  }, [authLoading, user, navigate]);

  const load = async () => {
    if (!user) return;
    setLoading(true);
    const [{ data: w }, { data: t }] = await Promise.all([
      supabase.from("wallets").select("*").eq("user_id", user.id).maybeSingle(),
      supabase
        .from("wallet_transactions")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(50),
    ]);
    if (!w) {
      const { data: created } = await supabase
        .from("wallets")
        .insert({ user_id: user.id })
        .select()
        .single();
      setWallet(created as Wallet);
    } else {
      setWallet(w as Wallet);
    }
    setTxns((t ?? []) as Txn[]);
    setLoading(false);
  };

  useEffect(() => {
    if (user) void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const connectBank = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wallet || !user) return;
    if (bank.account.replace(/\D/g, "").length < 4) {
      toast.error("Enter a valid account number");
      return;
    }
    setBusy(true);
    try {
      const last4 = bank.account.replace(/\D/g, "").slice(-4);
      const { data, error } = await supabase
        .from("wallets")
        .update({
          bank_name: bank.bank,
          bank_holder_name: bank.holder,
          bank_account_last4: last4,
          is_connected: true,
          connected_at: new Date().toISOString(),
        })
        .eq("user_id", user.id)
        .select()
        .single();
      if (error) throw error;
      setWallet(data as Wallet);
      setConnectOpen(false);
      setBank({ holder: "", bank: "", account: "", routing: "" });
      toast.success("Bank account linked");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not link bank");
    } finally {
      setBusy(false);
    }
  };

  const disconnectBank = async () => {
    if (!user) return;
    setBusy(true);
    try {
      const { data, error } = await supabase
        .from("wallets")
        .update({
          is_connected: false,
          bank_name: null,
          bank_account_last4: null,
          bank_holder_name: null,
        })
        .eq("user_id", user.id)
        .select()
        .single();
      if (error) throw error;
      setWallet(data as Wallet);
      toast.success("Bank account unlinked");
    } finally {
      setBusy(false);
    }
  };

  const topUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wallet || !user) return;
    const amount = Number(topupAmount);
    if (!Number.isFinite(amount) || amount <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    if (!wallet.is_connected) {
      toast.error("Connect a bank account first");
      return;
    }
    setBusy(true);
    try {
      const newBalance = +(Number(wallet.balance) + amount).toFixed(2);
      const { data: w, error } = await supabase
        .from("wallets")
        .update({ balance: newBalance })
        .eq("user_id", user.id)
        .select()
        .single();
      if (error) throw error;
      const { error: tErr } = await supabase.from("wallet_transactions").insert({
        wallet_id: wallet.id,
        user_id: user.id,
        type: "deposit",
        amount,
        balance_after: newBalance,
        description: `Top-up from ${wallet.bank_name ?? "bank"} ••${wallet.bank_account_last4 ?? ""}`,
      });
      if (tErr) throw tErr;
      setWallet(w as Wallet);
      setTopupAmount("");
      await load();
      toast.success(`Added $${amount.toFixed(2)} to wallet`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Top-up failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-6 pt-28 pb-20 max-w-4xl">
        <div className="flex items-center gap-3 mb-8">
          <WalletIcon className="h-7 w-7 text-primary" />
          <h1 className="font-display text-3xl uppercase tracking-wider">Wallet</h1>
        </div>

        {loading ? (
          <p className="text-muted-foreground">Loading wallet…</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {/* Balance card */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-flame/30 md:col-span-2">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Available balance
              </div>
              <div className="mt-2 font-display text-5xl text-gradient-flame">
                ${Number(wallet?.balance ?? 0).toFixed(2)}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{wallet?.currency ?? "USD"}</div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  to="/orders"
                  className="text-xs uppercase tracking-wider text-muted-foreground hover:text-primary"
                >
                  View orders →
                </Link>
              </div>
            </div>

            {/* Bank connection */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-2 mb-3">
                <Banknote className="h-4 w-4 text-primary" />
                <h2 className="font-display uppercase tracking-wider text-sm">Bank account</h2>
              </div>
              {wallet?.is_connected ? (
                <div className="space-y-3">
                  <div className="text-sm">
                    <div className="font-display uppercase">{wallet.bank_name}</div>
                    <div className="text-muted-foreground text-xs">
                      {wallet.bank_holder_name} • ••••{wallet.bank_account_last4}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={disconnectBank}
                    disabled={busy}
                    className="gap-2"
                  >
                    <Unlink className="h-3.5 w-3.5" /> Unlink
                  </Button>
                </div>
              ) : connectOpen ? (
                <form onSubmit={connectBank} className="space-y-3">
                  <div>
                    <Label htmlFor="holder">Account holder</Label>
                    <Input
                      id="holder"
                      required
                      value={bank.holder}
                      onChange={(e) => setBank({ ...bank, holder: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bank">Bank name</Label>
                    <Input
                      id="bank"
                      required
                      value={bank.bank}
                      onChange={(e) => setBank({ ...bank, bank: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="routing">Routing #</Label>
                      <Input
                        id="routing"
                        required
                        inputMode="numeric"
                        value={bank.routing}
                        onChange={(e) => setBank({ ...bank, routing: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="account">Account #</Label>
                      <Input
                        id="account"
                        required
                        inputMode="numeric"
                        value={bank.account}
                        onChange={(e) => setBank({ ...bank, account: e.target.value })}
                      />
                    </div>
                  </div>
                  <p className="text-[10px] text-muted-foreground">
                    Demo only — credentials are not sent to a real bank. Only the last 4 digits
                    are stored.
                  </p>
                  <div className="flex gap-2">
                    <Button type="submit" disabled={busy} className="gap-2">
                      <Link2 className="h-3.5 w-3.5" /> Link bank
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setConnectOpen(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Connect your bank to top up the wallet and pay at checkout.
                  </p>
                  <Button onClick={() => setConnectOpen(true)} className="gap-2">
                    <Link2 className="h-3.5 w-3.5" /> Connect bank
                  </Button>
                </div>
              )}
            </div>

            {/* Top up */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-2 mb-3">
                <Plus className="h-4 w-4 text-primary" />
                <h2 className="font-display uppercase tracking-wider text-sm">Add funds</h2>
              </div>
              <form onSubmit={topUp} className="space-y-3">
                <div>
                  <Label htmlFor="amt">Amount (USD)</Label>
                  <Input
                    id="amt"
                    type="number"
                    min="1"
                    step="0.01"
                    placeholder="50.00"
                    value={topupAmount}
                    onChange={(e) => setTopupAmount(e.target.value)}
                    disabled={!wallet?.is_connected}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {[20, 50, 100, 250].map((v) => (
                    <button
                      key={v}
                      type="button"
                      disabled={!wallet?.is_connected}
                      onClick={() => setTopupAmount(String(v))}
                      className="text-xs px-3 py-1 rounded-full border border-border hover:border-primary disabled:opacity-50"
                    >
                      ${v}
                    </button>
                  ))}
                </div>
                <Button type="submit" disabled={busy || !wallet?.is_connected} className="w-full">
                  Top up from bank
                </Button>
                {!wallet?.is_connected && (
                  <p className="text-[10px] text-muted-foreground">
                    Connect a bank account to enable top-ups.
                  </p>
                )}
              </form>
            </div>

            {/* Transactions */}
            <div className="rounded-2xl border border-border bg-card p-6 md:col-span-2">
              <h2 className="font-display uppercase tracking-wider text-sm mb-3">
                Recent activity
              </h2>
              {txns.length === 0 ? (
                <p className="text-sm text-muted-foreground">No transactions yet.</p>
              ) : (
                <ul className="divide-y divide-border">
                  {txns.map((t) => {
                    const isCredit = t.type === "deposit" || t.type === "refund";
                    const Icon = t.type === "deposit"
                      ? ArrowDownCircle
                      : t.type === "refund"
                      ? RotateCcw
                      : ArrowUpCircle;
                    return (
                      <li key={t.id} className="py-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <Icon
                            className={`h-5 w-5 ${isCredit ? "text-emerald-500" : "text-primary"}`}
                          />
                          <div className="min-w-0">
                            <div className="text-sm font-display uppercase tracking-wider">
                              {t.type}
                            </div>
                            <div className="text-xs text-muted-foreground truncate">
                              {t.description ?? ""}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div
                            className={`font-display ${isCredit ? "text-emerald-500" : "text-foreground"}`}
                          >
                            {isCredit ? "+" : "−"}${Number(t.amount).toFixed(2)}
                          </div>
                          <div className="text-[10px] text-muted-foreground">
                            {new Date(t.created_at).toLocaleString()}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
