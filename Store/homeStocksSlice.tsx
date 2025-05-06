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
        (state, action: PayloadAction<homeStocksItem[]>) => {
          return action.payload;
        }
      )
      .addCase(homeStocksAsync.rejected, () => {
        console.log("homeStocksAsync.rejected");
      });
  },
});

const homeStocksAsync = createAsyncThunk(
  "homeStocks/homeStocksAsync",
  async () => {
    const response = await fetch("");
    const data = await response.json();
    return data;
  }
);

export default homeStocksSlice.reducer;
