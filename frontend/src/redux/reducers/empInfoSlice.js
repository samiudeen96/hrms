import { createSlice } from "@reduxjs/toolkit";
import { store } from "../store";

const initialState = {
  // name: store.getState().auth.user.name,
  // profile_picture: store.getState().user.profile_picture,
  // dob: "",
  // gender: "",
  // dept_id: "",
  // position_id: "",
  // emp_code: "",
  // joining_date: "",
  // salary: "",
  // address: "",
  // city: "",
  // pincode: "",
  // country: "",
  // nationality: "",
  employee: {},
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setCreateEmp: (state, action) => {
      const { employee } = action.payload;
      state.employee = employee;
    },
  },
});

export const { setCreateEmp } = employeeSlice.actions;
export default employeeSlice.reducer;
