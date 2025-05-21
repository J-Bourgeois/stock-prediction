import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { homeStocksApi } from "@/app/types/homeStocksInterface";

const initialState: homeStocksApi = {
  meta: {
    date_from: "",
    date_to: "",
  },
  data: [],
};

const homeStocksMicrosoftSlice = createSlice({
  name: "homeStocksMicrosoft",
  initialState,
  reducers: {
    hydrateHomeStocksMicrosoft: (_, action: PayloadAction<homeStocksApi>) => {
      return action.payload;
    },
  },
});

export const { hydrateHomeStocksMicrosoft } = homeStocksMicrosoftSlice.actions;
export default homeStocksMicrosoftSlice.reducer;
