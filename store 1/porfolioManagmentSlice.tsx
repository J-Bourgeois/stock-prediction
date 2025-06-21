import {  createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface stockManagmentItem {
  id: string;
  index: string;
}

const initialState: stockManagmentItem[] = [];

const stockManagmentSlice = createSlice({
  name: "stockManagment",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<stockManagmentItem>) => {
        state.push(action.payload)
    },
    removeItem: (state, action: PayloadAction<string>) => {
        const idToRemove = action.payload;
        return state.filter(item => item.id !== idToRemove)
    },
  },
});

export const { addItem, removeItem } = stockManagmentSlice.actions;

export default stockManagmentSlice.reducer;
