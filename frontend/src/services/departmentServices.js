import API from "../api/axios";
import { DEPT_ENDPOINTS } from "../api/endpoints/department";

export const createDeptFn = async (formData) => {
  const res = await API.post(DEPT_ENDPOINTS.CREATEDEPT, formData);
  return res.data;
};

export const deptListFn = async () => {
  const res = await API.get(DEPT_ENDPOINTS.DEPARTMENTS, );
  return res.data.departments;
};

export const createPositionFn = async (formData) => {
  const res = await API.post(DEPT_ENDPOINTS.CREATEPOSI, formData);
  return res.data;
};

export const positionListFn = async () => {
  const res = await API.get(DEPT_ENDPOINTS.POSITIONS, );
  return res.data.positions;
};

export const userDeptListFn = async () => {
  const res = await API.get(DEPT_ENDPOINTS.USERDEPARTMENTS );
  return res.data.departments;
};


export const userPositionListFn = async () => {
  const res = await API.get(DEPT_ENDPOINTS.USERPOSITIONS );
  return res.data.positions;
};
