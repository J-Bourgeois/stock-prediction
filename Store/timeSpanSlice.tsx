import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedTimeSpan: "30 Days",
};

export const timeSpanSlice = createSlice({
  name: "timeSpan",
  initialState,
  reducers: {
    setTimeSpan: (state, action) => {
      state.selectedTimeSpan = action.payload;
    },
  },
});

export const { setTimeSpan } = timeSpanSlice.actions;

export default timeSpanSlice.reducer;
