import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { homeStocksApi } from "@/app/types/homeStocksInterface";

const initialState: homeStocksApi = {
  meta: {
    date_from: "",
    date_to: "",
  },
  data: [],
};

const homeStocksAppleSlice = createSlice({
  name: "homeStocksApple",
  initialState,
  reducers: {
    hydrateHomeStocksApple: (_, action: PayloadAction<homeStocksApi>) => {
      return action.payload;
    },
  },
});

export const { hydrateHomeStocksApple } = homeStocksAppleSlice.actions;
export default homeStocksAppleSlice.reducer;
