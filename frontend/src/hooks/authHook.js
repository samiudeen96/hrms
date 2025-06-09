import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import {
  GetRolesFn,
  loginFn,
  signupFn,
} from "../services/tenantServices.js";
import { setLoggedData } from "../redux/reducers/authSlice";
// import { setMenuByRole } from "../redux/reducers/menuSlice";

export const useSignup = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: signupFn,
    onSuccess: (data) => {
      dispatch(setLoggedData({ token: data.token }));
    },
  });
};

// export const useCreateUser = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: createUserFn,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["userList"] }); // ✅ Modern v5 syntax
//     },
//     onError: (error) => {
//       console.error("User creation failed:", error);
//     },
//   });
// };

export const useRoleList = () => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: GetRolesFn,
  });
};

export const useLogin = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: loginFn,
    onSuccess: (data) => {
      // console.log(data);

      dispatch(
        setLoggedData({ token: data.token, loggedData: data.loggedData })
      );
      // dispatch(setMenuByRole(data.loggedData.role)); // role = 'admin', 'hr', or 'employee'
    },
  });
};
