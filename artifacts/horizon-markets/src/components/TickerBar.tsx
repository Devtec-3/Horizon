import { tickerItems } from "@/data/mockData";
import { 
  SiBitcoin, 
  SiEthereum, 
  SiSolana, 
  SiXrp, 
  SiDogecoin, 
  SiBinance, 
  SiCardano, 
  SiChainlink
} from "react-icons/si";

function getIcon(symbol: string, color: string) {
  const props = { size: 20, color };
  switch (symbol) {
    case "BTC": return <SiBitcoin {...props} />;
    case "ETH": return <SiEthereum {...props} />;
    case "SOL": return <SiSolana {...props} />;
    case "XRP": return <SiXrp {...props} />;
    case "DOGE": return <SiDogecoin {...props} />;
    case "BNB": return <SiBinance {...props} />;
    case "ADA": return <SiCardano {...props} />;
    case "LINK": return <SiChainlink {...props} />;
    case "AVAX": return <div style={{ backgroundColor: color }} className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[8px] font-bold">AV</div>;
    default:
      return (
        <div
          style={{ backgroundColor: color }}
          className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[8px] font-bold"
        >
          {symbol.slice(0, 3)}
        </div>
      );
  }
}

export function TickerBar() {
  return (
    <div className="bg-black border-y border-[#1e1e1e] h-12 overflow-hidden flex items-center" data-testid="ticker-bar">
      <div className="ticker-track">
        {tickerItems.map((item, i) => (
          <div key={`t1-${i}`} className="flex items-center px-6 gap-2 shrink-0">
            {getIcon(item.symbol, item.color)}
            <span className="text-white text-sm font-medium">{item.pair}</span>
            <span className="text-white text-sm font-variant-numeric tabular-nums ml-1">
              {item.price}
            </span>
            <div className="inline-block w-px h-5 bg-[#2a2a2a] ml-6" />
          </div>
        ))}
        {tickerItems.map((item, i) => (
          <div key={`t2-${i}`} className="flex items-center px-6 gap-2 shrink-0">
            {getIcon(item.symbol, item.color)}
            <span className="text-white text-sm font-medium">{item.pair}</span>
            <span className="text-white text-sm font-variant-numeric tabular-nums ml-1">
              {item.price}
            </span>
            <div className="inline-block w-px h-5 bg-[#2a2a2a] ml-6" />
          </div>
        ))}
      </div>
    </div>
  );
}
