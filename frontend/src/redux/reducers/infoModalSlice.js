import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  infoContent: {},
};

const infoModalSlice = createSlice({
  name: "infoModal",
  initialState,
  reducers: {
    modalOpen: (state, action) => {
      state.infoContent = action.payload;

      state.isModalOpen = true;
    },
    modalClose: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const { modalOpen, modalClose } = infoModalSlice.actions;
export default infoModalSlice.reducer;
