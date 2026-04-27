import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { Shield, Wrench } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin garage — HotWheelz" }],
  }),
  beforeLoad: async () => {
    const { data: sess } = await supabase.auth.getSession();
    if (!sess.session) throw redirect({ to: "/auth" });
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", sess.session.user.id);
    if (!roles?.some((r) => r.role === "admin")) {
      throw redirect({ to: "/" });
    }
  },
  component: AdminPage,
});

function AdminPage() {
  return (
    <div className="min-h-screen bg-background px-6 py-24">
      <div className="container mx-auto max-w-3xl text-center">
        <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
        <h1 className="font-display text-4xl uppercase mb-3">Admin garage</h1>
        <p className="text-muted-foreground mb-10">
          Coming soon: manage products, view orders, and update order status.
        </p>
        <div className="border border-dashed border-border rounded-2xl p-10">
          <Wrench className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
          <p className="font-display uppercase text-sm tracking-wider">
            Build phase 2 — say "build the admin dashboard" to continue.
          </p>
        </div>
        <Link
          to="/"
          className="inline-block mt-8 text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-primary"
        >
          ← Back to showroom
        </Link>
      </div>
    </div>
  );
}
