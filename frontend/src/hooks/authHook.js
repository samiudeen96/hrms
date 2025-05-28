import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { loginFn, signupFn } from "../services/authService";
import { setCredentials } from "../redux/reducers/authSlice";

export const useSignup = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: signupFn,
    onSuccess: (data) => {
      dispatch(setCredentials({ token: data.token }));
    },
  });
};

export const useLogin = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: loginFn,
    onSuccess: (data) => {
      dispatch(setCredentials({ token: data.token, user: data.user }));
    },
  });
};
