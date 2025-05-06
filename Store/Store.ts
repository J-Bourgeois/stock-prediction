import { configureStore } from "@reduxjs/toolkit";
import stockManagmentReducer from './porfolioManagmentSlice';
import homeStocksReducer from './homeStocksSlice';

export const store = configureStore({
  reducer: {
    homeStocks: homeStocksReducer,
    stockManagment: stockManagmentReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
