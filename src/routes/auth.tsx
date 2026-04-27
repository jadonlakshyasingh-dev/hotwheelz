import { createFileRoute, Link, useNavigate, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Flame, Loader2, Mail, Lock, User as UserIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import logo from "@/assets/hotwheelz-logo.png";

const signInSchema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(6, "At least 6 characters").max(100),
});

const signUpSchema = signInSchema.extend({
  displayName: z.string().trim().min(1, "Name required").max(60),
});

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — HotWheelz" },
      { name: "description", content: "Sign in or create your HotWheelz garage account." },
    ],
  }),
  beforeLoad: async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      throw redirect({ to: "/" });
    }
  },
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [busy, setBusy] = useState(false);

  // Safety net: if a session appears (e.g. via OAuth callback), bounce home.
  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) navigate({ to: "/" });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = signInSchema.safeParse({ email, password });
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

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = signUpSchema.safeParse({ email, password, displayName });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setBusy(true);
    const redirectUrl =
      typeof window !== "undefined" ? `${window.location.origin}/` : undefined;
    const { error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        emailRedirectTo: redirectUrl,
        data: { display_name: parsed.data.displayName },
      },
    });
    setBusy(false);
    if (error) {
      if (error.message.toLowerCase().includes("registered")) {
        toast.error("That email is already registered. Try signing in.");
      } else {
        toast.error(error.message);
      }
      return;
    }
    toast.success("Account created — start your engines!");
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background relative overflow-hidden">
      {/* Background flair */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.18),transparent_60%),radial-gradient(circle_at_80%_80%,hsl(var(--accent)/0.12),transparent_55%)] pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="flex flex-col items-center mb-8 group">
          <img
            src={logo}
            alt="HotWheelz"
            width={1264}
            height={848}
            className="h-24 w-auto drop-shadow-[0_0_30px_hsl(var(--primary)/0.45)] group-hover:scale-105 transition-transform"
          />
          <p className="mt-3 text-xs uppercase tracking-[0.4em] text-muted-foreground inline-flex items-center gap-2">
            <Flame className="h-3 w-3 text-primary" />
            Members garage
          </p>
        </Link>

        <div className="bg-card/80 backdrop-blur border border-border rounded-2xl p-6 shadow-2xl shadow-primary/10">
          <Tabs value={tab} onValueChange={(v) => setTab(v as "signin" | "signup")}>
            <TabsList className="grid grid-cols-2 w-full mb-6">
              <TabsTrigger value="signin" className="font-display uppercase tracking-wider">
                Sign in
              </TabsTrigger>
              <TabsTrigger value="signup" className="font-display uppercase tracking-wider">
                Sign up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
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
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <Field
                  id="su-name"
                  label="Driver name"
                  type="text"
                  icon={<UserIcon className="h-4 w-4" />}
                  value={displayName}
                  onChange={setDisplayName}
                  placeholder="Your call sign"
                  autoComplete="name"
                />
                <Field
                  id="su-email"
                  label="Email"
                  type="email"
                  icon={<Mail className="h-4 w-4" />}
                  value={email}
                  onChange={setEmail}
                  placeholder="you@email.com"
                  autoComplete="email"
                />
                <Field
                  id="su-password"
                  label="Password"
                  type="password"
                  icon={<Lock className="h-4 w-4" />}
                  value={password}
                  onChange={setPassword}
                  placeholder="At least 6 characters"
                  autoComplete="new-password"
                />
                <Button
                  type="submit"
                  disabled={busy}
                  className="w-full font-display uppercase tracking-wider bg-gradient-to-r from-primary to-accent hover:opacity-90"
                >
                  {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Start your engine"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <p className="text-center text-xs text-muted-foreground mt-6">
            By continuing you agree to the HotWheelz garage rules.
          </p>
        </div>

        <Link
          to="/"
          className="block text-center text-xs text-muted-foreground hover:text-primary mt-6 uppercase tracking-[0.3em]"
        >
          ← Back to showroom
        </Link>
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  type,
  icon,
  value,
  onChange,
  placeholder,
  autoComplete,
}: {
  id: string;
  label: string;
  type: string;
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </Label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {icon}
        </span>
        <Input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="pl-9"
          required
        />
      </div>
    </div>
  );
}
