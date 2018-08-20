import SelectedCoinData from './SelectedCoinData';

interface SelectedCoin {
  Aggregated?: boolean;
  Data: SelectedCoinData;
  Message: string;
  Response: string;
  Type?: number;
}

export default SelectedCoin;
