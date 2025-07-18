import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.accessToken;
    },
    logOut: (state) => {
      state.token = null;
    },
  },
});

export default authSlice.reducer;
export const { setCredentials, logOut } = authSlice.actions;

export const selectCurrentToken = (state: any) => state.auth.token;
