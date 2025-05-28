import API from "../api/axios.js";
import { AUTH_URL } from "../api/endpoints/auth.js";

export const signupFn = async (formData) => {
  const res = await API.post(AUTH_URL.SIGNUP, formData);
  return res.data;
};

export const loginFn = async (formData) => {
  const res = await API.post(AUTH_URL.LOGIN, formData);
  return res.data;
};
