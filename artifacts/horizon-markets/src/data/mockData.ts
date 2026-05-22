function spark(base: number, n = 24, trend: "up" | "down" | "flat" = "up"): number[] {
  let v = base;
  const data = [v];
  for (let i = 1; i < n; i++) {
    const noise = (Math.sin(i * base * 0.0013 + i * 0.7) * 0.018);
    const drift = trend === "up" ? 0.003 : trend === "down" ? -0.003 : 0;
    v = v * (1 + noise + drift);
    data.push(v);
  }
  return data;
}

export const tickerItems = [
  { pair: "BTC/USDT",  price: "$97,523.40", changeStr: "+2.58%",  color: "#F7931A", positive: true,  symbol: "BTC"  },
  { pair: "ETH/USDT",  price: "$3,421.75",  changeStr: "+1.84%",  color: "#627EEA", positive: true,  symbol: "ETH"  },
  { pair: "SOL/USDT",  price: "$182.30",    changeStr: "+4.12%",  color: "#9945FF", positive: true,  symbol: "SOL"  },
  { pair: "BNB/USDT",  price: "$598.10",    changeStr: "+0.93%",  color: "#F3BA2F", positive: true,  symbol: "BNB"  },
  { pair: "XRP/USDT",  price: "$0.5821",    changeStr: "+3.40%",  color: "#00B4D8", positive: true,  symbol: "XRP"  },
  { pair: "ADA/USDT",  price: "$0.4412",    changeStr: "-4.04%",  color: "#0033AD", positive: false, symbol: "ADA"  },
  { pair: "DOGE/USDT", price: "$0.1283",    changeStr: "+1.27%",  color: "#C2A633", positive: true,  symbol: "DOGE" },
  { pair: "AVAX/USDT", price: "$35.72",     changeStr: "-4.74%",  color: "#E84142", positive: false, symbol: "AVAX" },
  { pair: "LINK/USDT", price: "$14.88",     changeStr: "+2.11%",  color: "#2A5ADA", positive: true,  symbol: "LINK" },
  { pair: "LTC/USDT",  price: "$80.43",     changeStr: "-2.88%",  color: "#BFBBBB", positive: false, symbol: "LTC"  },
];

export const trendingAssets = [
  { symbol: "YFI",  name: "yearn.finance",  price: "$8,510.18", change: "-1.21%", volume: "$253.78M", positive: false, sparkData: spark(8800, 24, "down") },
  { symbol: "MKR",  name: "Maker",          price: "$1,823.45", change: "+2.04%", volume: "$186.20M", positive: true,  sparkData: spark(1780, 24, "up")   },
  { symbol: "AAVE", name: "Aave",           price: "$104.32",   change: "+3.18%", volume: "$321.44M", positive: true,  sparkData: spark(100, 24, "up")    },
  { symbol: "ZEC",  name: "Zcash",          price: "$28.90",    change: "-0.88%", volume: "$94.11M",  positive: false, sparkData: spark(29, 24, "down")   },
  { symbol: "QNT",  name: "Quant",          price: "$78.54",    change: "+1.55%", volume: "$42.38M",  positive: true,  sparkData: spark(77, 24, "up")     },
  { symbol: "EGLD", name: "MultiversX",     price: "$31.20",    change: "+0.74%", volume: "$61.05M",  positive: true,  sparkData: spark(31, 24, "flat")   },
];

export const topGainers = [
  { rank: "1", symbol: "BTC",  name: "Bitcoin",   price: "$97,523.40", change: "+442.75%", color: "#F7931A" },
  { rank: "2", symbol: "IMX",  name: "Immutable", price: "$1.59",      change: "+3.98%",   color: "#17b3b3" },
  { rank: "3", symbol: "GRT",  name: "The Graph", price: "$0.281",     change: "+3.98%",   color: "#6747ed" },
  { rank: "4", symbol: "RNDR", name: "Render",    price: "$8.44",      change: "+3.89%",   color: "#F04F40" },
];

export const topLosers = [
  { rank: "1", symbol: "BCH",  name: "Bitcoin Cash", price: "$368.90", change: "-10.50%", color: "#8DC351" },
  { rank: "2", symbol: "SNX",  name: "Synthetix",    price: "$2.80",   change: "-3.96%",  color: "#00d2ff" },
  { rank: "3", symbol: "ATOM", name: "Cosmos",       price: "$9.82",   change: "-3.85%",  color: "#2E3148" },
  { rank: "4", symbol: "SUSHI","name": "SushiSwap",  price: "$1.20",   change: "-3.83%",  color: "#fa52a0" },
];

export const marketsList = [
  { symbol: "BTC",    name: "Bitcoin",         price: "$97,523.40",  change: "+2.58%",  positive: true,  volume: "$48.2B",  starred: true  },
  { symbol: "ETH",    name: "Ethereum",        price: "$3,421.75",   change: "+1.84%",  positive: true,  volume: "$19.8B",  starred: true  },
  { symbol: "XRP",    name: "Ripple",          price: "$0.5821",     change: "+3.40%",  positive: true,  volume: "$3.7B",   starred: false },
  { symbol: "BNB",    name: "Binance Coin",    price: "$598.10",     change: "+0.93%",  positive: true,  volume: "$2.1B",   starred: false },
  { symbol: "SOL",    name: "Solana",          price: "$182.30",     change: "+4.12%",  positive: true,  volume: "$5.1B",   starred: false },
  { symbol: "DOGE",   name: "Dogecoin",        price: "$0.1283",     change: "+1.27%",  positive: true,  volume: "$1.8B",   starred: false },
  { symbol: "ADA",    name: "Cardano",         price: "$0.4412",     change: "-4.04%",  positive: false, volume: "$1.2B",   starred: false },
  { symbol: "TRX",    name: "TRON",            price: "$0.1124",     change: "+0.72%",  positive: true,  volume: "$0.9B",   starred: false },
  { symbol: "AVAX",   name: "Avalanche",       price: "$35.72",      change: "-4.74%",  positive: false, volume: "$0.9B",   starred: false },
  { symbol: "LINK",   name: "Chainlink",       price: "$14.88",      change: "+2.11%",  positive: true,  volume: "$0.7B",   starred: false },
  { symbol: "SHIB",   name: "Shiba Inu",       price: "$0.0000219",  change: "+0.55%",  positive: true,  volume: "$0.6B",   starred: false },
  { symbol: "SUI",    name: "Sui",             price: "$1.82",       change: "+5.32%",  positive: true,  volume: "$0.8B",   starred: false },
  { symbol: "XLM",    name: "Stellar",         price: "$0.1183",     change: "+1.44%",  positive: true,  volume: "$0.4B",   starred: false },
  { symbol: "DOT",    name: "Polkadot",        price: "$7.18",       change: "+0.54%",  positive: true,  volume: "$0.4B",   starred: false },
  { symbol: "HBAR",   name: "Hedera",          price: "$0.0812",     change: "-1.22%",  positive: false, volume: "$0.3B",   starred: false },
  { symbol: "BCH",    name: "Bitcoin Cash",    price: "$368.90",     change: "-10.50%", positive: false, volume: "$0.8B",   starred: false },
  { symbol: "UNI",    name: "Uniswap",         price: "$9.44",       change: "+1.50%",  positive: true,  volume: "$0.45B",  starred: false },
  { symbol: "LDO",    name: "Lido DAO",        price: "$2.12",       change: "-0.89%",  positive: false, volume: "$0.2B",   starred: false },
  { symbol: "GALA",   name: "Gala",            price: "$0.0288",     change: "+2.71%",  positive: true,  volume: "$0.15B",  starred: false },
  { symbol: "JASMY",  name: "JasmyCoin",       price: "$0.00892",    change: "+1.08%",  positive: true,  volume: "$0.1B",   starred: false },
  { symbol: "SAND",   name: "The Sandbox",     price: "$0.4210",     change: "-1.55%",  positive: false, volume: "$0.22B",  starred: false },
  { symbol: "FLOW",   name: "Flow",            price: "$0.7144",     change: "+0.33%",  positive: true,  volume: "$0.08B",  starred: false },
  { symbol: "XTZ",    name: "Tezos",           price: "$0.9032",     change: "-0.71%",  positive: false, volume: "$0.07B",  starred: false },
  { symbol: "EOS",    name: "EOS",             price: "$0.7718",     change: "+1.12%",  positive: true,  volume: "$0.18B",  starred: false },
  { symbol: "AXS",    name: "Axie Infinity",   price: "$6.44",       change: "-2.10%",  positive: false, volume: "$0.12B",  starred: false },
  { symbol: "EGLD",   name: "MultiversX",      price: "$31.20",      change: "+0.74%",  positive: true,  volume: "$0.06B",  starred: false },
  { symbol: "IOTA",   name: "IOTA",            price: "$0.1811",     change: "+0.62%",  positive: true,  volume: "$0.04B",  starred: false },
  { symbol: "DYDX",   name: "dYdX",            price: "$1.82",       change: "+2.44%",  positive: true,  volume: "$0.09B",  starred: false },
  { symbol: "MANA",   name: "Decentraland",    price: "$0.3714",     change: "-1.88%",  positive: false, volume: "$0.11B",  starred: false },
  { symbol: "NEO",    name: "NEO",             price: "$11.24",      change: "+0.44%",  positive: true,  volume: "$0.05B",  starred: false },
  { symbol: "SNX",    name: "Synthetix",       price: "$2.80",       change: "-3.96%",  positive: false, volume: "$0.08B",  starred: false },
  { symbol: "CFX",    name: "Conflux",         price: "$0.1544",     change: "+1.24%",  positive: true,  volume: "$0.07B",  starred: false },
  { symbol: "CHZ",    name: "Chiliz",          price: "$0.0712",     change: "-0.55%",  positive: false, volume: "$0.06B",  starred: false },
  { symbol: "ROSE",   name: "Oasis Network",   price: "$0.0681",     change: "+0.88%",  positive: true,  volume: "$0.05B",  starred: false },
  { symbol: "CRV",    name: "Curve DAO",       price: "$0.3982",     change: "-2.15%",  positive: false, volume: "$0.09B",  starred: false },
  { symbol: "CAKE",   name: "PancakeSwap",     price: "$2.44",       change: "+1.66%",  positive: true,  volume: "$0.07B",  starred: false },
  { symbol: "AGIX",   name: "SingularityNET",  price: "$0.6211",     change: "+3.22%",  positive: true,  volume: "$0.12B",  starred: false },
  { symbol: "KAVA",   name: "Kava",            price: "$0.5844",     change: "-0.44%",  positive: false, volume: "$0.03B",  starred: false },
  { symbol: "COMP",   name: "Compound",        price: "$44.88",      change: "+0.92%",  positive: true,  volume: "$0.04B",  starred: false },
  { symbol: "KSM",    name: "Kusama",          price: "$22.40",      change: "-1.33%",  positive: false, volume: "$0.02B",  starred: false },
  { symbol: "WOO",    name: "WOO Network",     price: "$0.1882",     change: "+0.74%",  positive: true,  volume: "$0.03B",  starred: false },
  { symbol: "ZIL",    name: "Zilliqa",         price: "$0.0218",     change: "+1.44%",  positive: true,  volume: "$0.04B",  starred: false },
  { symbol: "BAT",    name: "Basic Attention", price: "$0.2112",     change: "-0.82%",  positive: false, volume: "$0.03B",  starred: false },
  { symbol: "DASH",   name: "Dash",            price: "$30.11",      change: "+0.21%",  positive: true,  volume: "$0.03B",  starred: false },
  { symbol: "CELO",   name: "Celo",            price: "$0.6844",     change: "-1.11%",  positive: false, volume: "$0.02B",  starred: false },
  { symbol: "SUSHI",  name: "SushiSwap",       price: "$1.20",       change: "-3.83%",  positive: false, volume: "$0.05B",  starred: false },
  { symbol: "LRC",    name: "Loopring",        price: "$0.1988",     change: "+0.55%",  positive: true,  volume: "$0.02B",  starred: false },
  { symbol: "GMX",    name: "GMX",             price: "$22.44",      change: "+1.32%",  positive: true,  volume: "$0.04B",  starred: false },
  { symbol: "YFI",    name: "yearn.finance",   price: "$8,510.18",   change: "-1.21%",  positive: false, volume: "$0.05B",  starred: false },
  { symbol: "OCEAN",  name: "Ocean Protocol",  price: "$0.7014",     change: "+2.88%",  positive: true,  volume: "$0.04B",  starred: false },
  { symbol: "ONE",    name: "Harmony",         price: "$0.01544",    change: "+0.44%",  positive: true,  volume: "$0.02B",  starred: false },
  { symbol: "WAVES",  name: "Waves",           price: "$1.4112",     change: "-2.44%",  positive: false, volume: "$0.02B",  starred: false },
  { symbol: "STORJ",  name: "Storj",           price: "$0.4422",     change: "+1.08%",  positive: true,  volume: "$0.02B",  starred: false },
  { symbol: "ENJ",    name: "Enjin Coin",      price: "$0.1988",     change: "-0.66%",  positive: false, volume: "$0.02B",  starred: false },
  { symbol: "ICX",    name: "ICON",            price: "$0.1544",     change: "+0.33%",  positive: true,  volume: "$0.01B",  starred: false },
  { symbol: "AUDIO",  name: "Audius",          price: "$0.1488",     change: "-0.88%",  positive: false, volume: "$0.01B",  starred: false },
  { symbol: "OMG",    name: "OMG Network",     price: "$0.5812",     change: "+0.77%",  positive: true,  volume: "$0.02B",  starred: false },
  { symbol: "BLUR",   name: "Blur",            price: "$0.2144",     change: "+3.11%",  positive: true,  volume: "$0.06B",  starred: false },
  { symbol: "MAGIC",  name: "Magic",           price: "$0.4812",     change: "+1.88%",  positive: true,  volume: "$0.03B",  starred: false },
  { symbol: "MKR",    name: "Maker",           price: "$1,823.45",   change: "+2.04%",  positive: true,  volume: "$0.07B",  starred: false },
  { symbol: "AAVE",   name: "Aave",            price: "$104.32",     change: "+3.18%",  positive: true,  volume: "$0.12B",  starred: false },
  { symbol: "ATOM",   name: "Cosmos",          price: "$9.82",       change: "-3.85%",  positive: false, volume: "$0.08B",  starred: false },
  { symbol: "LTC",    name: "Litecoin",        price: "$80.43",      change: "-2.88%",  positive: false, volume: "$0.06B",  starred: false },
  { symbol: "PEPE",   name: "Pepe",            price: "$0.0000121",  change: "+11.76%", positive: true,  volume: "$2.2B",   starred: false },
  { symbol: "FET",    name: "Fetch.ai",        price: "$1.42",       change: "+9.38%",  positive: true,  volume: "$0.5B",   starred: false },
  { symbol: "SEI",    name: "Sei",             price: "$0.521",      change: "+9.09%",  positive: true,  volume: "$0.3B",   starred: false },
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
  { id: "grid",      name: "Grid Bot",      description: "Buys low and sells high in a set range.",      profit: "+8.2%",  period: "7d",  risk: "Low",      pairs: "BTC/USDT", active: false },
  { id: "dca",       name: "DCA Bot",       description: "Invests fixed amounts at regular intervals.",   profit: "+12.4%", period: "30d", risk: "Very Low",  pairs: "ETH/USDT", active: true  },
  { id: "momentum",  name: "Momentum Bot",  description: "Follows trends and rides momentum for gains.", profit: "+31.7%", period: "14d", risk: "High",      pairs: "SOL/USDT", active: false },
  { id: "arbitrage", name: "Arbitrage Bot", description: "Exploits price differences across pairs.",      profit: "+5.9%",  period: "7d",  risk: "Medium",    pairs: "Multiple", active: false },
];
