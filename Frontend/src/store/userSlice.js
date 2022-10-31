import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const userSlice = createSlice({
  name: "userStore",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state, action) => {
      // localStorage.clear();
      state.value = action.payload;
    },
    update: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { login, logout, update } = userSlice.actions;

export default userSlice.reducer;
