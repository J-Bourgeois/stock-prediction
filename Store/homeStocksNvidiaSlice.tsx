import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { homeStocksApi } from "@/app/interfaces/homeStocksInterface";

const initialState: homeStocksApi = {
  meta: {
    date_from: 0,
    date_to: 0,
  },
  data: [],
};

const apiKey = process.env.NEXT_PUBLIC_STOCKDATA_API_key;

const today = new Date();

const thirtyDaysAgo = new Date();
thirtyDaysAgo.setDate(today.getDate() - 30);

const ninetyDaysAgo = new Date();
ninetyDaysAgo.setDate(today.getDate() - 90);

const oneEightyDaysAgo = new Date();
oneEightyDaysAgo.setDate(today.getDate() - 180);

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const homeStocksNvidiaSlice = createSlice({
  name: "homeStocksNvidia",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(homeStocksNvidiaAsync.pending, () => {
        console.log("homeStockNvidiaAsync.pending");
      })
      .addCase(
        homeStocksNvidiaAsync.fulfilled,
        (_, action: PayloadAction<homeStocksApi>) => {
          return action.payload;
        }
      )
      .addCase(homeStocksNvidiaAsync.rejected, () => {
        console.log("homeStocksNvidiaAsync.rejected");
      });
  },
});

export const homeStocksNvidiaAsync = createAsyncThunk(
  "homeStocksNvidia/homeStocksNvidiaAsync",
  async () => {
    const response = await fetch(
      `https://api.stockdata.org/v1/data/intraday?symbols=NVDA&api_token=${apiKey}`
    );
    const data = await response.json();
    return data;
  }
);

export default homeStocksNvidiaSlice.reducer;
