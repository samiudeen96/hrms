import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");
const user = token ? JSON.parse(localStorage.getItem("user")) : null;

const initialState = {
  token: token || null,
  user: user || null,
  role: user?.role || null,
  isAuthenticated: !!token,
};

const authSlice = createSlice({
  name: "auth",
  initialState, 
  reducers: {
    setCredentials: (state, action) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
      state.role = user?.role;
      state.isAuthenticated;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    },
    logout: (state) => {},
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
