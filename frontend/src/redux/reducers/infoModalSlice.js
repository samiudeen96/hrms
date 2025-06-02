import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  infoContent: {
    text1: "",
    text2: "",
    buttonName: "",
    color: "",
    actionType: "",
    onConfirm: null, // Add callback storage
  },
};

const infoModalSlice = createSlice({
  name: "infoModal",
  initialState,
  reducers: {
    modalOpen: (state, action) => {
      state.infoContent = {
        text1: action.payload.text1,
        text2: action.payload.text2,
        buttonName: action.payload.buttonName,
        color: action.payload.color,
        actionType: action.payload.actionType,
        onConfirm: action.payload.onConfirm, // Store the callback
      };
      state.isModalOpen = true;
    },
    modalClose: (state) => {
      state.isModalOpen = false;
      // Reset the callback when closing
      state.infoContent.onConfirm = null;
    },
  },
});

export const { modalOpen, modalClose } = infoModalSlice.actions;
export default infoModalSlice.reducer;
