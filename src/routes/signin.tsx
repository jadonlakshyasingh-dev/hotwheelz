import { createFileRoute, Link, useNavigate, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, Mail, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthShell, GoogleButton } from "@/components/auth/AuthShell";

const schema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(6, "At least 6 characters").max(100),
});

export const Route = createFileRoute("/signin")({
  head: () => ({
    meta: [
      { title: "Sign in — HotWheelz" },
      {
        name: "description",
        content:
          "Sign in to your HotWheelz garage to track orders, manage your wallet, and shop premium die-cast collectibles.",
      },
      { property: "og:title", content: "Sign in — HotWheelz" },
      {
        property: "og:description",
        content: "Sign in to your HotWheelz garage to track orders and shop the drop.",
      },
      { property: "og:url", content: "https://hotwheelz.lovable.app/signin" },
    ],
    links: [{ rel: "canonical", href: "https://hotwheelz.lovable.app/signin" }],
  }),
  beforeLoad: async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session) throw redirect({ to: "/" });
  },
  component: SignInPage,
});

function SignInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [googleBusy, setGoogleBusy] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) navigate({ to: "/" });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword(parsed.data);
    setBusy(false);
    if (error) {
      toast.error(
        error.message.toLowerCase().includes("invalid")
          ? "Invalid email or password"
          : error.message,
      );
      return;
    }
    toast.success("Welcome back to the garage!");
    navigate({ to: "/" });
  };

  const handleGoogle = async () => {
    setGoogleBusy(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setGoogleBusy(false);
      toast.error("Google sign-in failed. Try again.");
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/" });
  };

  return (
    <AuthShell eyebrow="Members garage">
      <h1 className="font-display text-2xl uppercase tracking-wider text-center mb-1">
        Sign in
      </h1>
      <p className="text-center text-xs text-muted-foreground mb-6">
        Hit the throttle. Resume your collection.
      </p>

      <GoogleButton loading={googleBusy} onClick={handleGoogle} label="Continue with Google" />

      <div className="flex items-center gap-3 my-5">
        <div className="h-px flex-1 bg-border" />
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">or</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={handleSignIn} className="space-y-4">
        <Field
          id="si-email"
          label="Email"
          type="email"
          icon={<Mail className="h-4 w-4" />}
          value={email}
          onChange={setEmail}
          placeholder="you@email.com"
          autoComplete="email"
        />
        <Field
          id="si-password"
          label="Password"
          type="password"
          icon={<Lock className="h-4 w-4" />}
          value={password}
          onChange={setPassword}
          placeholder="••••••••"
          autoComplete="current-password"
        />
        <Button
          type="submit"
          disabled={busy}
          className="w-full font-display uppercase tracking-wider bg-gradient-to-r from-primary to-accent hover:opacity-90"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Hit the track"}
        </Button>
      </form>

      <p className="text-center text-xs text-muted-foreground mt-6">
        New driver?{" "}
        <Link to="/signup" className="text-primary hover:underline uppercase tracking-wider">
          Create an account
        </Link>
      </p>
    </AuthShell>
  );
}

function Field({
  id, label, type, icon, value, onChange, placeholder, autoComplete,
}: {
  id: string; label: string; type: string; icon: React.ReactNode;
  value: string; onChange: (v: string) => void; placeholder?: string; autoComplete?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</span>
        <Input
          id={id} type={type} value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder} autoComplete={autoComplete}
          className="pl-9" required
        />
      </div>
    </div>
  );
}
