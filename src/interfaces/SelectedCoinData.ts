import CoinInfo from './SelectedCoinInfo';
import Exchanges from './SelectedCoinExchanges';
import AggregatedData from './SelectedCoinAggregatedData';

interface SelectedCoinData {
  AggregatedData: AggregatedData;

  CoinInfo: CoinInfo;

  Exchanges: Exchanges[];
}

export default SelectedCoinData;
