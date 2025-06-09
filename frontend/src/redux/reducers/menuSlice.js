import { createSlice } from "@reduxjs/toolkit";
import { roleMenus } from "../../utils/constant";

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    items: [],
  },
  reducers: {
    setMenuByRole: (state, action) => {
      const role = action.payload;
      state.items = roleMenus[role] || [];
    },
    clearMenu: (state) => {
      state.items = [];
    },
  },
});

export const { setMenuByRole, clearMenu } = menuSlice.actions;
export default menuSlice.reducer;
