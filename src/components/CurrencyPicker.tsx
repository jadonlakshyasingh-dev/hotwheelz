import { Coins, Check } from "lucide-react";
import { useCurrency } from "@/context/CurrencyContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const CURRENCIES: { code: string; label: string; flag: string }[] = [
  { code: "USD", label: "US Dollar", flag: "🇺🇸" },
  { code: "INR", label: "Indian Rupee", flag: "🇮🇳" },
  { code: "EUR", label: "Euro", flag: "🇪🇺" },
  { code: "GBP", label: "British Pound", flag: "🇬🇧" },
  { code: "JPY", label: "Japanese Yen", flag: "🇯🇵" },
  { code: "CNY", label: "Chinese Yuan", flag: "🇨🇳" },
  { code: "AUD", label: "Australian Dollar", flag: "🇦🇺" },
  { code: "CAD", label: "Canadian Dollar", flag: "🇨🇦" },
  { code: "CHF", label: "Swiss Franc", flag: "🇨🇭" },
  { code: "SGD", label: "Singapore Dollar", flag: "🇸🇬" },
  { code: "AED", label: "UAE Dirham", flag: "🇦🇪" },
  { code: "SAR", label: "Saudi Riyal", flag: "🇸🇦" },
  { code: "BRL", label: "Brazilian Real", flag: "🇧🇷" },
  { code: "MXN", label: "Mexican Peso", flag: "🇲🇽" },
  { code: "ZAR", label: "South African Rand", flag: "🇿🇦" },
  { code: "KRW", label: "Korean Won", flag: "🇰🇷" },
  { code: "TRY", label: "Turkish Lira", flag: "🇹🇷" },
  { code: "RUB", label: "Russian Ruble", flag: "🇷🇺" },
  { code: "PKR", label: "Pakistani Rupee", flag: "🇵🇰" },
  { code: "BDT", label: "Bangladeshi Taka", flag: "🇧🇩" },
];

export function CurrencyPicker({ className = "" }: { className?: string }) {
  const { currency, symbol, setCurrencyManual } = useCurrency();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={`inline-flex items-center gap-1.5 px-2.5 py-2 rounded-full border border-border hover:border-primary hover:text-primary transition-all text-xs font-display uppercase tracking-wider ${className}`}
          aria-label="Change currency"
          title={`Currency: ${currency}`}
        >
          <Coins className="h-3.5 w-3.5" />
          <span className="leading-none">{symbol} {currency}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 max-h-80 overflow-y-auto">
        <DropdownMenuLabel className="font-display uppercase tracking-wider text-xs text-muted-foreground">
          Currency
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {CURRENCIES.map((c) => (
          <DropdownMenuItem
            key={c.code}
            onClick={() => setCurrencyManual(c.code)}
            className="cursor-pointer flex items-center gap-2"
          >
            <span className="text-base">{c.flag}</span>
            <span className="flex-1 truncate">{c.label}</span>
            <span className="text-xs text-muted-foreground">{c.code}</span>
            {currency === c.code && <Check className="h-3.5 w-3.5 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
