import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");
const storedLoggedData = localStorage.getItem("loggedData");
const storedRegisteredUuid = localStorage.getItem("registeredId");


// Fix: check for "undefined" string before parsing
let loggedData = null;
if (token && storedLoggedData && storedLoggedData !== "undefined") {
  try {
    loggedData = JSON.parse(storedLoggedData);
  } catch (e) {
    console.warn("Failed to parse loggedData from localStorage:", e);
    loggedData = null;
  }
}

const initialState = {
  token: token || null,
  loggedData: loggedData || null,
  isAuthenticated: !!token,
  registeredInfo: {},
  storedRegisteredUuid: storedRegisteredUuid || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //login
    setLoggedData: (state, action) => {
      const { token, loggedData } = action.payload;
      state.token = token;
      state.loggedData = loggedData;
      state.isAuthenticated = true;

      localStorage.setItem("token", token);
      localStorage.setItem("loggedData", JSON.stringify(loggedData));
    },

    // register
    setRegisteredData: (state, action) => {
      const { registeredInfo } = action.payload;
      state.registeredInfo = registeredInfo;
      state.storedRegisteredUuid = registeredInfo.uuid;

      const uuid = registeredInfo?.uuid;
      if (uuid) {
        localStorage.setItem("registeredId", uuid);
      }
    },

    logout: (state) => {
      state.token = null;
      state.loggedData = null;
      state.isAuthenticated = false;
      state.storedRegisteredUuid = null;

      localStorage.removeItem("token");
      localStorage.removeItem("loggedData");
      localStorage.removeItem("registeredId");
    },
  },
});

export const { setLoggedData, setRegisteredData, logout } = authSlice.actions;
export default authSlice.reducer;
