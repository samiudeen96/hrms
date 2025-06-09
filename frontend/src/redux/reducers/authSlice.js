import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");
const loggedData = token ? JSON.parse(localStorage.getItem("loggedData")) : null;

const initialState = {
  token: token || null,
  loggedData: loggedData || null,
  isAuthenticated: !!token,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedData: (state, action) => {
      const { token, loggedData } = action.payload;
      state.token = token;
      state.loggedData = loggedData;
      state.isAuthenticated = true; // ✅ fixed

      localStorage.setItem("token", token);
      localStorage.setItem("loggedData", JSON.stringify(loggedData));
    },
    logout: (state) => {
      state.token = null;
      state.loggedData = null;
      state.isAuthenticated = false;

      localStorage.removeItem("token");
      localStorage.removeItem("loggedData");
    },
  },
});

export const { setLoggedData, logout } = authSlice.actions;
export default authSlice.reducer;
