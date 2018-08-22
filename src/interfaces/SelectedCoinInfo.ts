interface CoinInfo {
  Algorithm: string;
  BlockNumber: number;
  BlockReward: number;
  BlockTime: number;
  FullName: string;
  Id: string;
  ImageUrl: string;
  Internal: string;
  Name: string;
  NetHashesPerSecond: number;
  ProofType: string;
  TotalCoinsMined: number;
  TotalVolume24H: number;
  Url: string;
}

export default CoinInfo;
