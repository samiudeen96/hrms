import API from "../api/axios";
import { EMP_ENDPOINTS } from "../api/endpoints/employee";

export const registerEmployeeFn = async (formData) => {
  const res = await API.post(EMP_ENDPOINTS.REGISTER, formData);
  return res.data;
};

export const employeeProfileFn = async () => {
  const res = await API.get(EMP_ENDPOINTS.PROFILE);
  if (res) return res.data.empProfile;
};

// admin
export const createEmployeeFn = async (formData) => {
  const res = await API.post(EMP_ENDPOINTS.CREATE, formData);
  return res.data;
};

export const ListEmployeeFn = async () => {
  const res = await API.get(EMP_ENDPOINTS.LIST);
  return res.data.empList;
};
