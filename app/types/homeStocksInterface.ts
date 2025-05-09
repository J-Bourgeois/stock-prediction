// interfaces for all the homeStocks
export interface stockPricesData {
  ticker: string;
  date: string;
  data: {
    close: number,
    volume: number
  }
}

export interface homeStocksApi {
  meta: {
    date_from: string;
    date_to: string;
  };
  data: stockPricesData[];
}