import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Moon, Sun, Flame, Menu, X, ShoppingBag, Search, User as UserIcon, LogOut, Shield, UserCog, Package, Wallet as WalletIcon } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useSearch } from "@/context/SearchContext";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useCurrency } from "@/context/CurrencyContext";
import { SearchAutocomplete } from "@/components/SearchAutocomplete";
import { FinishPicker } from "@/components/FinishPicker";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const links = [
  { href: "#featured", label: "Featured" },
  { href: "#fast-furious", label: "F&F" },
  { href: "#classics", label: "Classics" },
  { href: "#supercars", label: "Supercars" },
  { href: "#track", label: "Track" },
  { href: "#limited", label: "Limited" },
  { href: "#new", label: "New" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [light, setLight] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [desktopFocused, setDesktopFocused] = useState(false);
  const [mobileFocused, setMobileFocused] = useState(false);
  const desktopRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const { count, setOpen: openCart } = useCart();
  const { query, setQuery, clear, isActive, results } = useSearch();
  const { user, profile, isAdmin, signOut } = useAuth();
  const { format, rate, symbol } = useCurrency();
  const [walletBalance, setWalletBalance] = useState<number | null>(null);

  useEffect(() => {
    if (!user) {
      setWalletBalance(null);
      return;
    }
    let cancelled = false;
    const load = async () => {
      const { data } = await supabase
        .from("wallets")
        .select("balance")
        .eq("user_id", user.id)
        .maybeSingle();
      if (!cancelled) setWalletBalance(data ? Number(data.balance) : 0);
    };
    void load();
    const channel = supabase
      .channel(`wallet-balance-${user.id}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "wallets", filter: `user_id=eq.${user.id}` },
        (payload) => {
          const next = (payload.new as { balance?: number } | null)?.balance;
          if (next != null) setWalletBalance(Number(next));
        },
      )
      .subscribe();
    return () => {
      cancelled = true;
      void supabase.removeChannel(channel);
    };
  }, [user]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (desktopRef.current && !desktopRef.current.contains(t)) setDesktopFocused(false);
      if (mobileRef.current && !mobileRef.current.contains(t)) setMobileFocused(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", light);
  }, [light]);

  // When a search becomes active, scroll the results into view
  useEffect(() => {
    if (!isActive) return;
    const el = document.getElementById("search-results");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, [isActive]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isActive ? "glass py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between gap-3 px-6">
        <a href="#top" className="flex items-center gap-2 group flex-shrink-0">
          <Flame className="h-7 w-7 text-primary animate-flame-flicker group-hover:scale-110 transition-transform" />
          <span className="font-display text-xl tracking-widest hidden sm:inline">
            HOT<span className="text-gradient-flame">WHEELZ</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all hover:after:w-full"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Desktop search */}
        <div ref={desktopRef} className="hidden md:flex relative flex-1 max-w-xs ml-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setDesktopFocused(true)}
            placeholder="Search cars or category…"
            aria-label="Search cars"
            className="w-full bg-card/60 border border-border focus:border-primary focus:ring-1 focus:ring-primary/40 outline-none rounded-full pl-9 pr-9 py-2 text-sm placeholder:text-muted-foreground transition-all"
          />
          {query && (
            <button
              onClick={clear}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
          {desktopFocused && query && (
            <SearchAutocomplete onSelect={() => setDesktopFocused(false)} />
          )}
          {isActive && !desktopFocused && (
            <div className="absolute top-full left-0 right-0 mt-1 text-[10px] uppercase tracking-widest text-muted-foreground px-3">
              {results.length} match{results.length === 1 ? "" : "es"}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <FinishPicker className="hidden xl:inline-flex" />
          <button
            onClick={() => setSearchOpen((v) => !v)}
            className="md:hidden p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-all"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </button>
          {user && (
            <Link
              to="/wallet"
              className="relative p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-all"
              aria-label={
                walletBalance != null
                  ? `Wallet balance ${walletBalance.toFixed(2)} dollars`
                  : "Open wallet"
              }
              title={walletBalance != null ? `Wallet: $${walletBalance.toFixed(2)}` : "Wallet"}
            >
              <WalletIcon className="h-4 w-4" />
              {walletBalance != null && (
                <span className="absolute -top-1.5 -right-1.5 h-5 min-w-5 px-1.5 rounded-full bg-primary text-primary-foreground text-[10px] font-display flex items-center justify-center shadow-flame">
                  ${walletBalance >= 1000 ? `${Math.floor(walletBalance / 1000)}k` : Math.round(walletBalance)}
                </span>
              )}
            </Link>
          )}
          <button
            onClick={() => openCart(true)}
            className="relative p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-all"
            aria-label="Open cart"
          >
            <ShoppingBag className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 h-5 min-w-5 px-1 rounded-full bg-flame text-primary-foreground text-[10px] font-display flex items-center justify-center shadow-flame animate-pulse-glow">
                {count}
              </span>
            )}
          </button>
          {/* User menu */}
          {user ? (
            (() => {
              const displayName = profile?.display_name || user.email || "";
              const initials = displayName.split(/\s+|@/)[0].slice(0, 2).toUpperCase();
              return (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className="relative rounded-full border border-border hover:border-primary transition-all overflow-hidden h-9 w-9 flex items-center justify-center"
                      aria-label="Account menu"
                    >
                      <Avatar className="h-9 w-9">
                        <AvatarImage
                          src={profile?.avatar_url || undefined}
                          alt={displayName}
                        />
                        <AvatarFallback className="bg-secondary text-foreground text-[11px] font-display tracking-wider">
                          {initials || <UserIcon className="h-4 w-4" />}
                        </AvatarFallback>
                      </Avatar>
                      {isAdmin && (
                        <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-background" />
                      )}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-60">
                    <DropdownMenuLabel className="flex items-center gap-3 py-2">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={profile?.avatar_url || undefined}
                          alt={displayName}
                        />
                        <AvatarFallback className="bg-secondary text-[11px] font-display tracking-wider">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col min-w-0">
                        <span className="font-display uppercase tracking-wider text-xs text-muted-foreground">
                          Driver
                        </span>
                        <span className="truncate text-sm">
                          {profile?.display_name || user.email}
                        </span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="cursor-pointer">
                        <UserCog className="h-4 w-4 mr-2" />
                        Edit profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/orders" className="cursor-pointer">
                        <Package className="h-4 w-4 mr-2" />
                        My orders
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/wallet" className="cursor-pointer">
                        <WalletIcon className="h-4 w-4 mr-2" />
                        Wallet
                      </Link>
                    </DropdownMenuItem>
                    {isAdmin && (
                      <DropdownMenuItem asChild>
                        <Link to="/admin" className="cursor-pointer">
                          <Shield className="h-4 w-4 mr-2" />
                          Admin garage
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      onClick={async () => {
                        await signOut();
                        toast.success("Engine off. See you on the next race.");
                      }}
                      className="cursor-pointer text-destructive focus:text-destructive"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            })()
          ) : (
            <Link
              to="/signin"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-border hover:border-primary hover:text-primary transition-all text-xs font-display uppercase tracking-wider"
            >
              <UserIcon className="h-3.5 w-3.5" />
              Sign in
            </Link>
          )}
          <button
            onClick={() => setLight((v) => !v)}
            className="p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-all hidden sm:inline-flex"
            aria-label="Toggle theme"
          >
            {light ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden p-2 rounded-full border border-border"
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile search */}
      {searchOpen && (
        <div ref={mobileRef} className="md:hidden mx-6 mt-3 relative animate-ignite">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setMobileFocused(true)}
            placeholder="Search cars or category…"
            aria-label="Search cars"
            className="w-full bg-card/80 border border-border focus:border-primary outline-none rounded-full pl-9 pr-9 py-2.5 text-sm"
          />
          {query && (
            <button
              onClick={clear}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-secondary"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
          {mobileFocused && query && (
            <SearchAutocomplete onSelect={() => setMobileFocused(false)} />
          )}
        </div>
      )}

      {open && (
        <nav className="lg:hidden glass mt-3 mx-6 rounded-xl p-4 flex flex-col gap-3 animate-ignite">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm uppercase tracking-wider hover:text-primary"
            >
              {l.label}
            </a>
          ))}
          <div className="pt-2 mt-1 border-t border-border">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
              Finish
            </div>
            <FinishPicker variant="compact" />
          </div>
        </nav>
      )}
    </header>
  );
}
