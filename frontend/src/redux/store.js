import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/reducers/authSlice";
import infoModalReducer from "../redux/reducers/infoModalSlice";
import menuReducer from "../redux/reducers/menuSlice";
import employeeReducer from "../redux/reducers/employeeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    infoModal: infoModalReducer,
    menu: menuReducer,
    employee: employeeReducer,
  },
});
