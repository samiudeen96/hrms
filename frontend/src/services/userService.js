import API from "../api/axios.js";
import { USER_ENDPOINTS } from "../api/endpoints/user.js";

export const createUserFn = async (formData) => {
  const res = await API.post(USER_ENDPOINTS.CREATE, formData);
  return res.data;
};

export const loginUserFn = async (formData) => {
  const res = await API.post(USER_ENDPOINTS.LOGIN, formData);
  return res.data;
};

export const getUsersFn = async () => {
  const res = await API.get(USER_ENDPOINTS.LIST);
  return res.data.users;
};
