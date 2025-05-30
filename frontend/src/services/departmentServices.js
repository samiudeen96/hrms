import API from "../api/axios";
import { DEPARTMENT_URL } from "../api/endpoints/department";

export const getList = async () => {
  const res = await API.get(DEPARTMENT_URL.LIST);
  return res.data.data;
};
