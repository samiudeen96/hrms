import API from "../api/axios.js";
import { AUTH_ENDPOINTS } from "../api/endpoints/tenant.js";


export const signupFn = async (formData) => {
  const res = await API.post(AUTH_ENDPOINTS.SIGNUP, formData);
  return res.data;
};

export const GetRolesFn = async () => {
  const res = await API.get(AUTH_ENDPOINTS.GETROLES);
  return res.data.roles;
};

export const loginFn = async (formData) => {
  const res = await API.post(AUTH_ENDPOINTS.LOGIN, formData);
  return res.data;
};
