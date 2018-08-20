import CoinUnitMoney from './CoinUnitMoney';

interface CoinUnit {
  circulating_supply: number;
  id: number;
  last_updated: number;
  max_supply: number;
  name: string;
  quotes: { USD: CoinUnitMoney; KRW: CoinUnitMoney };
  rank: number;
  symbol: string;
  total_supply: number;
  website_slug: string;
}

export default CoinUnit;
