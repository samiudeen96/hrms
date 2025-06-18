import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employeeInfo: {},
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setEmployeeData: (state, action) => {
      const { employeeInfo } = action.payload;
      state.employeeInfo = employeeInfo;

      localStorage.setItem("uuidEmp", JSON.stringify(employeeInfo.uuid));
    },
  },
});

export const { setEmployeeData } = employeeSlice.actions;

export default employeeSlice.reducer;
