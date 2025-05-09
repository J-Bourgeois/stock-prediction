import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { homeStocksApi } from "@/app/types/homeStocksInterface";

const apiKey = process.env.NEXT_PUBLIC_STOCKDATA_API_key;

const initialState: homeStocksApi = {
  meta: {
    date_from: 0,
    date_to: 0,
  },
  data: [],
};

const homeStocksMicrosoftSlice = createSlice({
  name: "homeStocksMicrosoft",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(homeStocksMicrosoftAsync.pending, () => {
        console.log("homeStocksMicrosoftAsync.pending");
      })
      .addCase(
        homeStocksMicrosoftAsync.fulfilled,
        (_, action: PayloadAction<homeStocksApi>) => {
          return action.payload;
        }
      )
      .addCase(homeStocksMicrosoftAsync.rejected, () => {
        console.log("homeStocksMicrosoftAsync.rejected");
      });
  },
});

export const homeStocksMicrosoftAsync = createAsyncThunk(
  "homeStocksMicrosoft/homeStocksMicrosoftAsync",
  async () => {
    const response = await fetch(
      `https://api.stockdata.org/v1/data/intraday?symbols=MSFT&api_token=${apiKey}`
    );
    const data = await response.json();
    return data;
  }
);

export default homeStocksMicrosoftSlice.reducer
