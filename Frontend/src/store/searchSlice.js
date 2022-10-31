import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { text: "" },
};

export const searchSlice = createSlice({
  name: "SEARCH_QUE",
  initialState: initialState,
  reducers: {
    searchQue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { searchQue } = searchSlice.actions;

export default searchSlice.reducer;
