import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";


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
    requested: number,
    returned: number
  },
  data: stockPricesData[]
}


const initialState: homeStocksApi = {
  meta: {
    requested: 0,
    returned: 0
  },
  data: []
}

const homeStocksSlice = createSlice({
  name: "homeStocks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(homeStocksAsync.pending, () => {
        console.log("homeStockAsync.pending");
      })
      .addCase(
        homeStocksAsync.fulfilled,
        (_, action: PayloadAction<homeStocksApi>) => {
          return action.payload;
        }
      )
      .addCase(homeStocksAsync.rejected, () => {
        console.log("homeStocksAsync.rejected");
      });
  },
});

export const homeStocksAsync = createAsyncThunk(
  "homeStocks/homeStocksAsync",
  async () => {
    const apiKey = process.env.NEXT_PUBLIC_STOCKDATA_API_key
    const response = await fetch(`https://api.stockdata.org/v1/data/quote?symbols=AAPL,NVDA,MSFT&api_token=${apiKey}`);
    const data = await response.json();
    return data;
  }
);

export default homeStocksSlice.reducer;
