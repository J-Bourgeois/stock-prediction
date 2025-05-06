import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface homeStocksItem {
  id: string;
  index: string;
}

const initialState: homeStocksItem[] = [];

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
        (_, action: PayloadAction<homeStocksItem[]>) => {
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
    const response = await fetch(`https://api.stockdata.org/v1/data/quote?symbols=AAPL,NVDA,MSFT&api_token=${process.env.STOCKDATA_API_key}`);
    const data = await response.json();
    console.log(data);
    return data;
  }
);

export default homeStocksSlice.reducer;
