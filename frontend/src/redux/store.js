import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/reducers/authSlice";
import infoModalReducer from "../redux/reducers/infoModalSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    infoModal: infoModalReducer,
  },
});
