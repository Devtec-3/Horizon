export const tickerItems = [
  { symbol: "ETH", pair: "ETH/USDT", price: "2,130.25", color: "#627EEA" },
  { symbol: "BNB", pair: "BNB/USDT", price: "644.30", color: "#F3BA2F" },
  { symbol: "SOL", pair: "SOL/USDT", price: "84.95", color: "#9945FF" },
  { symbol: "XRP", pair: "XRP/USDT", price: "1.3695", color: "#00AAE4" },
  { symbol: "ADA", pair: "ADA/USDT", price: "0.2495", color: "#0033AD" },
  { symbol: "DOGE", pair: "DOGE/USDT", price: "0.10361", color: "#C2A633" },
  { symbol: "BTC", pair: "BTC/USDT", price: "97,500.00", color: "#F7931A" },
  { symbol: "LINK", pair: "LINK/USDT", price: "24.00", color: "#2A5ADA" },
  { symbol: "AVAX", pair: "AVAX/USDT", price: "42.20", color: "#E84142" },
];

export const trendingAssets = [
  { symbol: "YFI", name: "yearn.finance", price: "$8,578.67", change: "+1.45%", positive: true, volume: "$490.23 B", sparkData: [85,87,84,88,90,87,91,89,92] },
  { symbol: "MKR", name: "Maker", price: "$1,836.60", change: "+1.99%", positive: true, volume: "$210.10 B", sparkData: [180,183,181,185,187,184,188,186,190] },
  { symbol: "AAVE", name: "Aave", price: "$185.35", change: "+3.39%", positive: true, volume: "$155.44 B", sparkData: [178,180,179,182,185,183,186,184,188] },
  { symbol: "ZEC", name: "Zcash", price: "$52.28", change: "-2.93%", positive: false, volume: "$30.12 B", sparkData: [55,54,53,52,51,52,51,50,51] },
  { symbol: "QNT", name: "Quant", price: "$117.31", change: "-1.12%", positive: false, volume: "$45.22 B", sparkData: [120,119,118,118,117,117,116,117,116] },
  { symbol: "EGLD", name: "MultiversX", price: "$41.58", change: "-3.34%", positive: false, volume: "$25.90 B", sparkData: [44,43,43,42,42,41,41,41,40] },
];

export const topGainers = [
  { rank: 1, symbol: "BTC", price: "$77,408.08", change: "+454.83%", color: "#F7931A" },
  { rank: 2, symbol: "IMX", price: "$1.59", change: "+3.98%", color: "#0EA5E9" },
  { rank: 3, symbol: "GRT", price: "$0.281356", change: "+3.98%", color: "#6748EC" },
  { rank: 4, symbol: "RNDR", price: "$8.44", change: "+3.89%", color: "#FF3D00" },
];

export const topLosers = [
  { rank: 1, symbol: "BCH", price: "$368.90", change: "-10.50%", color: "#8DC351" },
  { rank: 2, symbol: "SNX", price: "$2.80", change: "-3.96%", color: "#1AB2DA" },
  { rank: 3, symbol: "ATOM", price: "$9.82", change: "-3.85%", color: "#6F7390" },
  { rank: 4, symbol: "SUSHI", price: "$1.20", change: "-3.83%", color: "#FA52A0" },
];

export const orderBookAsks = [
  { price: "97,597.50", amount: "0.4528", total: "44,191.164" },
  { price: "97,695.00", amount: "1.7989", total: "175,742.677" },
  { price: "97,792.50", amount: "0.2689", total: "26,294.341" },
  { price: "97,890.00", amount: "1.4814", total: "145,011.342" },
  { price: "97,987.50", amount: "1.4241", total: "139,540.209" },
  { price: "98,085.00", amount: "0.9446", total: "92,649.209" },
  { price: "98,182.50", amount: "1.2655", total: "124,251.035" },
  { price: "98,280.00", amount: "0.2078", total: "20,421.482" },
];

export const orderBookBids = [
  { price: "97,012.50", amount: "0.6584", total: "63,869.402" },
  { price: "96,915.00", amount: "0.7361", total: "71,338.043" },
  { price: "96,817.50", amount: "1.3499", total: "130,690.051" },
];

export const recentTrades = [
  { price: "97,524.99", amount: "0.2394", time: "10:19:13", side: "buy" },
  { price: "97,526.06", amount: "0.2517", time: "10:19:08", side: "buy" },
  { price: "97,536.24", amount: "0.3683", time: "10:19:03", side: "sell" },
  { price: "97,447.62", amount: "0.0961", time: "10:18:58", side: "sell" },
  { price: "97,442.67", amount: "0.1675", time: "10:18:53", side: "sell" },
  { price: "97,491.36", amount: "0.0214", time: "10:18:48", side: "buy" },
];

export const marketsList = [
  { symbol: "BTC", name: "Bitcoin", price: "$97,500.00", change: "+2.58%", positive: true, starred: true },
  { symbol: "ETH", name: "Ethereum", price: "$3,450.45", change: "-2.41%", positive: false, starred: true },
  { symbol: "XRP", name: "XRP", price: "$2.35", change: "+5.38%", positive: true, starred: false },
  { symbol: "BNB", name: "BNB", price: "$680.00", change: "+2.29%", positive: true, starred: false },
  { symbol: "SOL", name: "Solana", price: "$185.75", change: "+4.65%", positive: true, starred: false },
  { symbol: "DOGE", name: "Dogecoin", price: "$0.32", change: "+6.67%", positive: true, starred: false },
  { symbol: "ADA", name: "Cardano", price: "$0.95", change: "-4.04%", positive: false, starred: false },
  { symbol: "TRX", name: "TRON", price: "$0.24", change: "+4.35%", positive: true, starred: false },
  { symbol: "AVAX", name: "Avalanche", price: "$42.20", change: "-4.74%", positive: false, starred: false },
  { symbol: "LINK", name: "Chainlink", price: "$24.00", change: "+5.49%", positive: true, starred: false },
  { symbol: "SHIB", name: "Shiba Inu", price: "$0.000025", change: "+4.76%", positive: true, starred: false },
  { symbol: "SUI", name: "Sui", price: "$4.20", change: "+8.25%", positive: true, starred: false },
  { symbol: "DOT", name: "Polkadot", price: "$7.50", change: "+4.90%", positive: true, starred: false },
  { symbol: "HBAR", name: "Hedera", price: "$0.28", change: "+7.69%", positive: true, starred: false },
  { symbol: "BCH", name: "Bitcoin Cash", price: "$485.00", change: "+2.65%", positive: true, starred: false },
  { symbol: "UNI", name: "Uniswap", price: "$14.50", change: "+4.92%", positive: true, starred: false },
  { symbol: "LDO", name: "Lido DAO", price: "$1.90", change: "+4.97%", positive: true, starred: false },
  { symbol: "MATIC", name: "Polygon", price: "$0.85", change: "+3.20%", positive: true, starred: false },
  { symbol: "NEAR", name: "NEAR Protocol", price: "$5.20", change: "+3.80%", positive: true, starred: false },
  { symbol: "ARB", name: "Arbitrum", price: "$1.10", change: "+4.50%", positive: true, starred: false },
  { symbol: "OP", name: "Optimism", price: "$2.40", change: "+5.00%", positive: true, starred: false },
  { symbol: "ATOM", name: "Cosmos", price: "$9.82", change: "-3.85%", positive: false, starred: false },
  { symbol: "SNX", name: "Synthetix", price: "$2.80", change: "-3.96%", positive: false, starred: false },
  { symbol: "LTC", name: "Litecoin", price: "$108.00", change: "-2.88%", positive: false, starred: false },
  { symbol: "SUSHI", name: "SushiSwap", price: "$1.20", change: "-3.83%", positive: false, starred: false },
  { symbol: "YFI", name: "yearn.finance", price: "$8,500.00", change: "+5.20%", positive: true, starred: false },
  { symbol: "MKR", name: "Maker", price: "$1,836.60", change: "+1.99%", positive: true, starred: false },
  { symbol: "AAVE", name: "Aave", price: "$185.35", change: "+3.39%", positive: true, starred: false },
  { symbol: "COMP", name: "Compound", price: "$68.00", change: "+4.94%", positive: true, starred: false },
  { symbol: "CRV", name: "Curve DAO", price: "$0.58", change: "+5.45%", positive: true, starred: false },
];
