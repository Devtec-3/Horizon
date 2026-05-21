import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface LivePrice {
  symbol: string;
  pair: string;
  price: number;
  change24h: number;
  positive: boolean;
  color: string;
}

const BASE: LivePrice[] = [
  { symbol: "BTC",   pair: "BTC/USDT",  price: 97523.40,   change24h: 2.58,  positive: true,  color: "#F7931A" },
  { symbol: "ETH",   pair: "ETH/USDT",  price: 3421.75,    change24h: 1.84,  positive: true,  color: "#627EEA" },
  { symbol: "BNB",   pair: "BNB/USDT",  price: 598.10,     change24h: 0.93,  positive: true,  color: "#F3BA2F" },
  { symbol: "SOL",   pair: "SOL/USDT",  price: 182.30,     change24h: 4.12,  positive: true,  color: "#9945FF" },
  { symbol: "XRP",   pair: "XRP/USDT",  price: 0.5821,     change24h: 3.40,  positive: true,  color: "#00B4D8" },
  { symbol: "ADA",   pair: "ADA/USDT",  price: 0.4412,     change24h: -4.04, positive: false, color: "#0033AD" },
  { symbol: "DOGE",  pair: "DOGE/USDT", price: 0.1283,     change24h: 1.27,  positive: true,  color: "#C2A633" },
  { symbol: "AVAX",  pair: "AVAX/USDT", price: 35.72,      change24h: -4.74, positive: false, color: "#E84142" },
  { symbol: "LINK",  pair: "LINK/USDT", price: 14.88,      change24h: 2.11,  positive: true,  color: "#2A5ADA" },
  { symbol: "LTC",   pair: "LTC/USDT",  price: 80.43,      change24h: -2.88, positive: false, color: "#BFBBBB" },
  { symbol: "PEPE",  pair: "PEPE/USDT", price: 0.0000121,  change24h: 11.76, positive: true,  color: "#00e676" },
  { symbol: "FET",   pair: "FET/USDT",  price: 1.42,       change24h: 9.38,  positive: true,  color: "#7B61FF" },
  { symbol: "SEI",   pair: "SEI/USDT",  price: 0.521,      change24h: 9.09,  positive: true,  color: "#9945FF" },
  { symbol: "ARB",   pair: "ARB/USDT",  price: 1.12,       change24h: 7.85,  positive: true,  color: "#2D374B" },
  { symbol: "DOT",   pair: "DOT/USDT",  price: 7.18,       change24h: 0.54,  positive: true,  color: "#E6007A" },
  { symbol: "MATIC", pair: "MATIC/USDT",price: 0.832,      change24h: -1.12, positive: false, color: "#8247E5" },
  { symbol: "ATOM",  pair: "ATOM/USDT", price: 8.72,       change24h: -1.93, positive: false, color: "#2E3148" },
  { symbol: "UNI",   pair: "UNI/USDT",  price: 9.44,       change24h: 1.50,  positive: true,  color: "#FF007A" },
];

export function formatPrice(price: number): string {
  if (price >= 10000) return "$" + price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (price >= 1000)  return "$" + price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (price >= 1)     return "$" + price.toFixed(2);
  if (price >= 0.01)  return "$" + price.toFixed(4);
  return "$" + price.toFixed(7);
}

interface LivePricesCtx {
  prices: LivePrice[];
  getPrice: (symbol: string) => LivePrice | undefined;
}

const Ctx = createContext<LivePricesCtx>({ prices: BASE, getPrice: () => undefined });

function tick(prices: LivePrice[]): LivePrice[] {
  return prices.map((p) => {
    const delta = (Math.random() - 0.5) * 0.004; // ±0.2% per tick
    const newPrice = Math.max(p.price * (1 + delta), 0.0000001);
    // drift the 24h change very slightly
    const changeDelta = (Math.random() - 0.5) * 0.02;
    const newChange = p.change24h + changeDelta;
    return {
      ...p,
      price: newPrice,
      change24h: newChange,
      positive: newChange >= 0,
    };
  });
}

export function LivePricesProvider({ children }: { children: ReactNode }) {
  const [prices, setPrices] = useState<LivePrice[]>(BASE);

  useEffect(() => {
    const id = setInterval(() => setPrices((prev) => tick(prev)), 2000);
    return () => clearInterval(id);
  }, []);

  const getPrice = (symbol: string) => prices.find((p) => p.symbol === symbol);

  return <Ctx.Provider value={{ prices, getPrice }}>{children}</Ctx.Provider>;
}

export function useLivePrices() {
  return useContext(Ctx);
}
