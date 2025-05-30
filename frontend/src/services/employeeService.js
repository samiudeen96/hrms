import API from "../api/axios";
import { EMPLOYEE_URL } from "../api/endpoints/employee";

export const createFn = async (formData) => {
  const res = await API.post(EMPLOYEE_URL.CREATE, formData);
  return res.data;
};

export const getInfoFn = async () => {
  const res = await API.get(EMPLOYEE_URL.INFO);
  return res.data.empInfo;
};
