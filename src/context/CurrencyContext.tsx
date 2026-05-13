import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Rates = Record<string, number>; // base USD

type CurrencyContextValue = {
  currency: string;
  symbol: string;
  rate: number; // 1 USD = rate <currency>
  loading: boolean;
  format: (usdAmount: number) => string;
  setCurrencyManual: (code: string) => void;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

// Country (ISO-2) → currency code
const COUNTRY_TO_CURRENCY: Record<string, string> = {
  IN: "INR", US: "USD", GB: "GBP", CA: "CAD", AU: "AUD", NZ: "NZD",
  JP: "JPY", CN: "CNY", HK: "HKD", SG: "SGD", KR: "KRW", TW: "TWD",
  MY: "MYR", TH: "THB", PH: "PHP", ID: "IDR", VN: "VND", PK: "PKR",
  BD: "BDT", LK: "LKR", NP: "NPR",
  AE: "AED", SA: "SAR", QA: "QAR", KW: "KWD", BH: "BHD", OM: "OMR",
  IL: "ILS", TR: "TRY", EG: "EGP", ZA: "ZAR", NG: "NGN", KE: "KES",
  MX: "MXN", BR: "BRL", AR: "ARS", CL: "CLP", CO: "COP", PE: "PEN",
  CH: "CHF", NO: "NOK", SE: "SEK", DK: "DKK", PL: "PLN", CZ: "CZK",
  HU: "HUF", RO: "RON", RU: "RUB", UA: "UAH",
  // Eurozone
  DE: "EUR", FR: "EUR", IT: "EUR", ES: "EUR", PT: "EUR", NL: "EUR",
  BE: "EUR", AT: "EUR", IE: "EUR", FI: "EUR", GR: "EUR", LU: "EUR",
};

const FALLBACK_RATES: Rates = {
  USD: 1, INR: 83, EUR: 0.92, GBP: 0.79, JPY: 155, CAD: 1.36, AUD: 1.5,
  NZD: 1.65, CHF: 0.88, CNY: 7.2, HKD: 7.8, SGD: 1.34, KRW: 1370,
  TWD: 32, MYR: 4.7, THB: 36, PHP: 57, IDR: 15800, VND: 25000, PKR: 278,
  BD: 110, BDT: 110, LKR: 300, NPR: 133, AED: 3.67, SAR: 3.75, QAR: 3.64,
  KWD: 0.31, BHD: 0.38, OMR: 0.385, ILS: 3.7, TRY: 32, EGP: 47, ZAR: 18.5,
  NGN: 1500, KES: 130, MXN: 17, BRL: 5.1, ARS: 950, CLP: 950, COP: 4000,
  PEN: 3.8, NOK: 10.7, SEK: 10.5, DKK: 6.9, PLN: 4, CZK: 23, HUF: 360,
  RON: 4.6, RUB: 92, UAH: 40,
};

const STORAGE_KEY = "preferred_currency";

function symbolFor(code: string): string {
  try {
    const parts = new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: code,
      currencyDisplay: "narrowSymbol",
    }).formatToParts(0);
    return parts.find((p) => p.type === "currency")?.value ?? code;
  } catch {
    return code;
  }
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<string>("USD");
  const [rates, setRates] = useState<Rates>(FALLBACK_RATES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function detect() {
      // 1. Manual override
      const stored =
        typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;

      // 2. Detect country
      let cur = stored;
      if (!cur) {
        try {
          const res = await fetch("https://ipapi.co/json/");
          if (res.ok) {
            const j = (await res.json()) as { country_code?: string; currency?: string };
            cur = j.currency || (j.country_code ? COUNTRY_TO_CURRENCY[j.country_code] : null);
          }
        } catch {
          // ignore — fall through to locale guess
        }
      }
      if (!cur && typeof navigator !== "undefined") {
        const region = new Intl.Locale(navigator.language).maximize().region;
        if (region) cur = COUNTRY_TO_CURRENCY[region];
      }
      cur = cur || "USD";

      // 3. Fetch live rates (free, no key)
      let liveRates: Rates | null = null;
      try {
        const res = await fetch("https://open.er-api.com/v6/latest/USD");
        if (res.ok) {
          const j = (await res.json()) as { rates?: Rates; result?: string };
          if (j.result === "success" && j.rates) liveRates = j.rates;
        }
      } catch {
        // keep fallback
      }

      if (!cancelled) {
        setCurrency(cur);
        if (liveRates) setRates(liveRates);
        setLoading(false);
      }
    }

    void detect();
    return () => {
      cancelled = true;
    };
  }, []);

  const setCurrencyManual = (code: string) => {
    setCurrency(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // ignore
    }
  };

  const value = useMemo<CurrencyContextValue>(() => {
    const rate = rates[currency] ?? 1;
    const symbol = symbolFor(currency);
    const noDecimals = ["JPY", "KRW", "VND", "IDR", "CLP", "HUF"].includes(currency);
    const format = (usd: number) => {
      const converted = usd * rate;
      try {
        return new Intl.NumberFormat(undefined, {
          style: "currency",
          currency,
          currencyDisplay: "narrowSymbol",
          maximumFractionDigits: noDecimals ? 0 : 2,
          minimumFractionDigits: noDecimals ? 0 : 2,
        }).format(converted);
      } catch {
        return `${symbol}${converted.toFixed(noDecimals ? 0 : 2)}`;
      }
    };
    return { currency, symbol, rate, loading, format, setCurrencyManual };
  }, [currency, rates, loading]);

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}
