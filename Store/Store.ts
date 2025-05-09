import { configureStore } from "@reduxjs/toolkit";
import stockManagmentReducer from './porfolioManagmentSlice';
import homeStocksNvidiaReducer from './homeStocksNvidiaSlice';
import homeStocksAppleReducer from './homeStocksAppleSlice';
import homeStocksMicrosoftReducer from './homeStocksMicrosoftSliceSlice';

export const store = configureStore({
  reducer: {
    homeStocksNvidia: homeStocksNvidiaReducer,
    homeStocksApple: homeStocksAppleReducer,
    homeStocksMicrosoft: homeStocksMicrosoftReducer,
    stockManagment: stockManagmentReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
