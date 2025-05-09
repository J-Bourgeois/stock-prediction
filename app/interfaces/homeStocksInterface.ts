
// interfaces for all the homeStocks
export interface homeStocksItem {
  id: string;
  index: string;
}

export interface stockPricesData {
  ticker: string;
  name: string;
  price: number;
  currency: string;
  day_high: number;
  day_low: number;
}

export interface homeStocksApi {
  meta: {
    date_from: number;
    date_to: number;
  };
  data: stockPricesData[];
}