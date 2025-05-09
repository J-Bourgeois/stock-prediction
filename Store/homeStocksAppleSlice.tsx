import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { homeStocksApi } from "@/app/interfaces/homeStocksInterface";

const apiKey = process.env.NEXT_PUBLIC_STOCKDATA_API_key;

const initialState: homeStocksApi = {
  meta: {
    date_from: 0,
    date_to: 0,
  },
  data: [],
};

const homeStocksAppleSlice = createSlice({
  name: "homeStocksApple",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(homeStocksAppleAsync.pending, () => {
    console.log("homeStocksAppleAsync.pending");
  })
  .addCase(
    homeStocksAppleAsync.fulfilled,
    (_, action: PayloadAction<homeStocksApi>) => {
      return action.payload;
    }
  )
  .addCase(homeStocksAppleAsync.rejected, () => {
    console.log("homeStocksAppleAsync.rejected");
  });
  }
})
  
export const homeStocksAppleAsync = createAsyncThunk(
  "homeStocksApple/homeStocksAppleAsync",
  async () => {
    const response = await fetch(
      `https://api.stockdata.org/v1/data/intraday?symbols=AAPL&api_token=${apiKey}`
    );
    const data = await response.json();
    return data;
  }
);

export default homeStocksAppleSlice.reducer