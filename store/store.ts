import { configureStore } from "@reduxjs/toolkit";
import timeSpanReducer from './timeSpanSlice';
import stockManagmentReducer from './porfolioManagmentSlice';
import homeStocksNvidiaReducer from './homeStocksNvidiaSlice';
import homeStocksAppleReducer from './homeStocksAppleSlice';
import homeStocksMicrosoftReducer from './homeStocksMicrosoftSliceSlice';

/**
 * Redux store configuration
 * Manages global state for:
 * - Stock data for multiple companies (NVDA, AAPL, MSFT)
 * - Time span selection for charts
 * - Portfolio management state
 * 
 * Uses Redux Toolkit for simplified state management
 */
export const store = configureStore({
  reducer: {
    homeStocksNvidia: homeStocksNvidiaReducer,
    homeStocksApple: homeStocksAppleReducer,
    homeStocksMicrosoft: homeStocksMicrosoftReducer,
    timeSpan: timeSpanReducer,
    stockManagment: stockManagmentReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
