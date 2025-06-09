import API from "../api/axios";
import { DEPT_ENDPOINTS } from "../api/endpoints/department";

export const createDeptFn = async (formData) => {
  const res = await API.post(DEPT_ENDPOINTS.CREATE, formData);
  return res.data;
};

export const createPositionFn = async (formData) => {
  const res = await API.post(DEPT_ENDPOINTS.CREATEPOSI, formData);
  return res.data;
};

export const deptListFn = async () => {
  const res = await API.get(DEPT_ENDPOINTS.LIST, );
  return res.data.departments;
};