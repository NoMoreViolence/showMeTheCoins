import MoneyData from './MoneyData';

export default interface CoinUnit {
  circulating_supply: number;
  id: number;
  last_updated: number;
  max_supply: number;
  name: string;
  quotes: { USD: MoneyData; KRW: MoneyData };
  rank: number;
  symbol: string;
  total_supply: number;
  website_slug: string;
}
