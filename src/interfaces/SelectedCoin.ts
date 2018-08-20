import SelectedCoinData from './SelectedCoinData';

interface SelectedCoin {
  KRW: {
    Aggregated?: boolean;
    Data: SelectedCoinData;
    Message: string;
    Response: string;
    Type?: number;
  };
  USD: {
    Aggregated?: boolean;
    Data: SelectedCoinData;
    Message: string;
    Response: string;
    Type?: number;
  };
  BTC: {
    Aggregated?: boolean;
    Data: SelectedCoinData;
    Message: string;
    Response: string;
    Type?: number;
  };
}

export default SelectedCoin;
