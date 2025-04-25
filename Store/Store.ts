import { configureStore } from "@reduxjs/toolkit";
import stockManagmentReducer from './stockManagmentSlice'

export const store = configureStore({
  reducer: {
    stockManagment: stockManagmentReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
