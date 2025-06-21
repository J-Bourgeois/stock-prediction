import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { homeStocksApi } from "@/app/types/homeStocksInterface";

const initialState: homeStocksApi = {
  meta: {
    date_from: "",
    date_to: "",
  },
  data: [],
};

const homeStocksNvidiaSlice = createSlice({
  name: "homeStocksNvidia",
  initialState,
  reducers: {
    hydrateHomeStocksNvidia: (_, action: PayloadAction<homeStocksApi>) => {
      return action.payload;
    },
  },
});

export const { hydrateHomeStocksNvidia } = homeStocksNvidiaSlice.actions;
export default homeStocksNvidiaSlice.reducer;
