import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { ArrowLeft, Save } from "lucide-react";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { user, profile, loading, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      void navigate({ to: "/auth" });
    }
  }, [loading, user, navigate]);

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.display_name ?? "");
      setAvatarUrl(profile.avatar_url ?? "");
    }
  }, [profile]);

  const initials = (displayName || user?.email || "?")
    .split(/\s+|@/)[0]
    .slice(0, 2)
    .toUpperCase();

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        display_name: displayName.trim() || null,
        avatar_url: avatarUrl.trim() || null,
      })
      .eq("user_id", user.id);
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    await refreshProfile();
    toast.success("Profile updated. Looking sharp.");
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Loading…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-6">
      <div className="container mx-auto max-w-xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to garage
        </Link>

        <div className="glass rounded-2xl p-6 sm:p-8 border border-border">
          <h1 className="font-display text-2xl tracking-widest uppercase mb-1">
            Driver <span className="text-gradient-flame">Profile</span>
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            Customize how you appear in the pit lane.
          </p>

          <div className="flex items-center gap-4 mb-8">
            <Avatar className="h-20 w-20 ring-2 ring-primary/40">
              <AvatarImage src={avatarUrl || undefined} alt={displayName || "Avatar"} />
              <AvatarFallback className="bg-secondary font-display text-lg">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <div className="font-display uppercase tracking-wider text-sm truncate">
                {displayName || user.email}
              </div>
              <div className="text-xs text-muted-foreground truncate">{user.email}</div>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-5">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                Display name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Your racing name"
                className="w-full bg-card/60 border border-border focus:border-primary focus:ring-1 focus:ring-primary/40 outline-none rounded-lg px-3 py-2.5 text-sm"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                Avatar URL
              </label>
              <input
                type="url"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="https://…"
                className="w-full bg-card/60 border border-border focus:border-primary focus:ring-1 focus:ring-primary/40 outline-none rounded-lg px-3 py-2.5 text-sm"
              />
              <p className="text-xs text-muted-foreground mt-1.5">
                Paste a link to any image — square works best.
              </p>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-primary text-primary-foreground font-display uppercase tracking-wider text-sm hover:opacity-90 transition disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              {saving ? "Saving…" : "Save profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
