function spark(base: number, n = 20): number[] {
  const seed = base;
  const data = [seed];
  let v = seed;
  for (let i = 1; i < n; i++) {
    const r = ((Math.sin(i * seed * 0.001 + i) + 1) / 2) * 0.04 - 0.02;
    v = v * (1 + r);
    data.push(v);
  }
  return data;
}

export const tickerItems = [
  { pair: "BTC/USDT",  price: "$97,523.40",  changeStr: "+2.58%",  color: "#F7931A", positive: true,  symbol: "BTC" },
  { pair: "ETH/USDT",  price: "$3,421.75",   changeStr: "+1.84%",  color: "#627EEA", positive: true,  symbol: "ETH" },
  { pair: "SOL/USDT",  price: "$182.30",      changeStr: "+4.12%",  color: "#9945FF", positive: true,  symbol: "SOL" },
  { pair: "BNB/USDT",  price: "$598.10",      changeStr: "+0.93%",  color: "#F3BA2F", positive: true,  symbol: "BNB" },
  { pair: "XRP/USDT",  price: "$0.5821",      changeStr: "+3.40%",  color: "#00B4D8", positive: true,  symbol: "XRP" },
  { pair: "ADA/USDT",  price: "$0.4412",      changeStr: "-4.04%",  color: "#0033AD", positive: false, symbol: "ADA" },
  { pair: "DOGE/USDT", price: "$0.1283",      changeStr: "+1.27%",  color: "#C2A633", positive: true,  symbol: "DOGE" },
  { pair: "AVAX/USDT", price: "$35.72",       changeStr: "-4.74%",  color: "#E84142", positive: false, symbol: "AVAX" },
  { pair: "LINK/USDT", price: "$14.88",       changeStr: "+2.11%",  color: "#2A5ADA", positive: true,  symbol: "LINK" },
  { pair: "LTC/USDT",  price: "$80.43",       changeStr: "-2.88%",  color: "#BFBBBB", positive: false, symbol: "LTC" },
];

export const trendingAssets = [
  { symbol: "BTC",  name: "Bitcoin",  price: "$97,523.40", change: "+2.58%", volume: "$48.2B", positive: true,  color: "#F7931A", sparkData: spark(97000) },
  { symbol: "ETH",  name: "Ethereum", price: "$3,421.75",  change: "+1.84%", volume: "$19.8B", positive: true,  color: "#627EEA", sparkData: spark(3400)  },
  { symbol: "SOL",  name: "Solana",   price: "$182.30",    change: "+4.12%", volume: "$5.1B",  positive: true,  color: "#9945FF", sparkData: spark(180)   },
  { symbol: "XRP",  name: "Ripple",   price: "$0.5821",    change: "+3.40%", volume: "$3.7B",  positive: true,  color: "#00B4D8", sparkData: spark(5800)  },
];

export const topGainers = [
  { rank: "1", symbol: "PEPE",  price: "$0.0000121", change: "+11.76%", color: "#00ff88" },
  { rank: "2", symbol: "FET",   price: "$1.42",      change: "+9.38%",  color: "#7B61FF" },
  { rank: "3", symbol: "SEI",   price: "$0.521",     change: "+9.09%",  color: "#9945FF" },
  { rank: "4", symbol: "ARB",   price: "$1.12",      change: "+7.85%",  color: "#2D374B" },
  { rank: "5", symbol: "OP",    price: "$2.31",      change: "+6.73%",  color: "#FF0420" },
];

export const topLosers = [
  { rank: "1", symbol: "AVAX",  price: "$35.72",   change: "-4.74%",  color: "#E84142" },
  { rank: "2", symbol: "ADA",   price: "$0.4412",  change: "-4.04%",  color: "#0033AD" },
  { rank: "3", symbol: "LTC",   price: "$80.43",   change: "-2.88%",  color: "#BFBBBB" },
  { rank: "4", symbol: "BCH",   price: "$234.10",  change: "-2.50%",  color: "#8DC351" },
  { rank: "5", symbol: "ATOM",  price: "$8.72",    change: "-1.93%",  color: "#2E3148" },
];

export const marketsList = [
  { symbol: "BTC",   name: "Bitcoin",      price: "$97,523.40",  change: "+2.58%",  positive: true,  volume: "$48.2B",  mcap: "$1.92T",  starred: true  },
  { symbol: "ETH",   name: "Ethereum",     price: "$3,421.75",   change: "+1.84%",  positive: true,  volume: "$19.8B",  mcap: "$411B",   starred: true  },
  { symbol: "BNB",   name: "Binance Coin", price: "$598.10",     change: "+0.93%",  positive: true,  volume: "$2.1B",   mcap: "$88B",    starred: false },
  { symbol: "SOL",   name: "Solana",       price: "$182.30",     change: "+4.12%",  positive: true,  volume: "$5.1B",   mcap: "$79B",    starred: false },
  { symbol: "XRP",   name: "Ripple",       price: "$0.5821",     change: "+3.40%",  positive: true,  volume: "$3.7B",   mcap: "$64B",    starred: false },
  { symbol: "ADA",   name: "Cardano",      price: "$0.4412",     change: "-4.04%",  positive: false, volume: "$1.2B",   mcap: "$15.6B",  starred: false },
  { symbol: "DOGE",  name: "Dogecoin",     price: "$0.1283",     change: "+1.27%",  positive: true,  volume: "$1.8B",   mcap: "$18.1B",  starred: false },
  { symbol: "AVAX",  name: "Avalanche",    price: "$35.72",      change: "-4.74%",  positive: false, volume: "$0.9B",   mcap: "$14.6B",  starred: false },
  { symbol: "LINK",  name: "Chainlink",    price: "$14.88",      change: "+2.11%",  positive: true,  volume: "$0.7B",   mcap: "$8.8B",   starred: false },
  { symbol: "LTC",   name: "Litecoin",     price: "$80.43",      change: "-2.88%",  positive: false, volume: "$0.6B",   mcap: "$5.9B",   starred: false },
  { symbol: "PEPE",  name: "Pepe",         price: "$0.0000121",  change: "+11.76%", positive: true,  volume: "$2.2B",   mcap: "$5.1B",   starred: false },
  { symbol: "FET",   name: "Fetch.ai",     price: "$1.42",       change: "+9.38%",  positive: true,  volume: "$0.5B",   mcap: "$1.2B",   starred: false },
  { symbol: "SEI",   name: "Sei",          price: "$0.521",      change: "+9.09%",  positive: true,  volume: "$0.3B",   mcap: "$1.5B",   starred: false },
  { symbol: "ARB",   name: "Arbitrum",     price: "$1.12",       change: "+7.85%",  positive: true,  volume: "$0.4B",   mcap: "$2.9B",   starred: false },
  { symbol: "OP",    name: "Optimism",     price: "$2.31",       change: "+6.73%",  positive: true,  volume: "$0.35B",  mcap: "$2.4B",   starred: false },
  { symbol: "BCH",   name: "Bitcoin Cash", price: "$234.10",     change: "-2.50%",  positive: false, volume: "$0.8B",   mcap: "$4.6B",   starred: false },
  { symbol: "DOT",   name: "Polkadot",     price: "$7.18",       change: "+0.54%",  positive: true,  volume: "$0.4B",   mcap: "$9.9B",   starred: false },
  { symbol: "MATIC", name: "Polygon",      price: "$0.832",      change: "-1.12%",  positive: false, volume: "$0.5B",   mcap: "$7.7B",   starred: false },
  { symbol: "ATOM",  name: "Cosmos",       price: "$8.72",       change: "-1.93%",  positive: false, volume: "$0.3B",   mcap: "$3.4B",   starred: false },
  { symbol: "UNI",   name: "Uniswap",      price: "$9.44",       change: "+1.50%",  positive: true,  volume: "$0.45B",  mcap: "$7.1B",   starred: false },
];

export const orderBookAsks = [
  { price: "97,540.00", amount: "0.4821", total: "47,013.12", depth: 95 },
  { price: "97,535.50", amount: "0.1234", total: "12,034.24", depth: 60 },
  { price: "97,532.00", amount: "0.8800", total: "85,828.16", depth: 100 },
  { price: "97,528.75", amount: "0.2100", total: "20,481.04", depth: 30 },
  { price: "97,525.00", amount: "0.5500", total: "53,638.75", depth: 70 },
];

export const orderBookBids = [
  { price: "97,515.50", amount: "0.6300", total: "61,434.77", depth: 85 },
  { price: "97,510.00", amount: "1.2400", total: "120,912.40", depth: 100 },
  { price: "97,505.25", amount: "0.3300", total: "32,176.73", depth: 45 },
  { price: "97,500.00", amount: "0.9900", total: "96,525.00", depth: 90 },
  { price: "97,495.75", amount: "0.4400", total: "42,898.13", depth: 55 },
];

export const recentTrades = [
  { price: "97,528.75", amount: "0.0342", time: "14:22:08", side: "buy"  },
  { price: "97,521.00", amount: "0.1120", time: "14:22:05", side: "sell" },
  { price: "97,530.25", amount: "0.0588", time: "14:22:01", side: "buy"  },
  { price: "97,515.50", amount: "0.2200", time: "14:21:58", side: "sell" },
  { price: "97,519.00", amount: "0.0810", time: "14:21:55", side: "buy"  },
  { price: "97,511.75", amount: "0.1440", time: "14:21:50", side: "sell" },
  { price: "97,525.00", amount: "0.0230", time: "14:21:46", side: "buy"  },
  { price: "97,505.00", amount: "0.3100", time: "14:21:43", side: "sell" },
  { price: "97,532.00", amount: "0.0670", time: "14:21:40", side: "buy"  },
  { price: "97,498.25", amount: "0.1880", time: "14:21:37", side: "sell" },
];

export const botTemplates = [
  { id: "grid",      name: "Grid Bot",     description: "Buys low and sells high in a set range.",       profit: "+8.2%",  period: "7d",  risk: "Low",      pairs: "BTC/USDT", active: false },
  { id: "dca",       name: "DCA Bot",      description: "Invests fixed amounts at regular intervals.",    profit: "+12.4%", period: "30d", risk: "Very Low",  pairs: "ETH/USDT", active: true  },
  { id: "momentum",  name: "Momentum Bot", description: "Follows trends and rides momentum for gains.",  profit: "+31.7%", period: "14d", risk: "High",     pairs: "SOL/USDT", active: false },
  { id: "arbitrage", name: "Arbitrage Bot",description: "Exploits price differences across pairs.",       profit: "+5.9%",  period: "7d",  risk: "Medium",   pairs: "Multiple", active: false },
];
