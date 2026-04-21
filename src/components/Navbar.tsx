import { useEffect, useState } from "react";
import { Moon, Sun, Flame, Menu, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

const links = [
  { href: "#featured", label: "Featured" },
  { href: "#classics", label: "Classics" },
  { href: "#supercars", label: "Supercars" },
  { href: "#limited", label: "Limited" },
  { href: "#new", label: "New" },
  { href: "#about", label: "About" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [light, setLight] = useState(false);
  const [open, setOpen] = useState(false);
  const { count, setOpen: openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", light);
  }, [light]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2 group">
          <Flame className="h-7 w-7 text-primary animate-flame-flicker group-hover:scale-110 transition-transform" />
          <span className="font-display text-xl tracking-widest">
            HOT<span className="text-gradient-flame">WHEELZ</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-7">
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

        <div className="flex items-center gap-3">
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
          <button
            onClick={() => setLight((v) => !v)}
            className="p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-all"
            aria-label="Toggle theme"
          >
            {light ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 rounded-full border border-border"
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden glass mt-3 mx-6 rounded-xl p-4 flex flex-col gap-3 animate-ignite">
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
        </nav>
      )}
    </header>
  );
}
