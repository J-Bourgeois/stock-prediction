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
    date_from: number;
    date_to: number;
  };
  data: stockPricesData[];
}

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
  return `${year}-${month}-${day}`
}

const homeStocksSlice = createSlice({
  name: "homeStocks",
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
      })
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
      })
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

export const homeStocksNvidiaAsync = createAsyncThunk(
  "homeStocks/homeStocksNvidiaAsync",
  async () => {
    const response = await fetch(
      `https://api.stockdata.org/v1/data/intraday?symbols=NVDA&api_token=${apiKey}`
    );
    const data = await response.json();
    return data;
  }
);

export const homeStocksAppleAsync = createAsyncThunk(
  "homeStocks/homeStocksAppleAsync",
  async () => {
    const response = await fetch(
      `https://api.stockdata.org/v1/data/intraday?symbols=AAPL&api_token=${apiKey}`
    );
    const data = await response.json();
    return data;
  }
);

export const homeStocksMicrosoftAsync = createAsyncThunk(
  "homeStocks/homeStocksMicrosoftAsync",
  async () => {
    const response = await fetch(
      `https://api.stockdata.org/v1/data/intraday?symbols=MSFT&api_token=${apiKey}`
    );
    const data = await response.json();
    return data;
  }
);

export default homeStocksSlice.reducer;
