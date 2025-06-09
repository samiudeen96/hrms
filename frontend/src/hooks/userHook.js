import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUserFn, getUsersFn, loginUserFn } from "../services/userService.js";
import { useDispatch } from "react-redux";
import { setLoggedData } from "../redux/reducers/authSlice.js";
// import { setMenuByRole } from "../redux/reducers/menuSlice.js";

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUserFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] }); // ✅ Modern v5 syntax
    },
    onError: (error) => {
      console.error("User creation failed:", error);
    },
  });
};


export const useUserLogin = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: loginUserFn,
    onSuccess: (data) => {
      // console.log(data);

      dispatch(
        setLoggedData({ token: data.token, loggedData: data.loggedData })
      );
      // dispatch(setMenuByRole(data.loggedData.role)); // role = 'admin', 'hr', or 'employee'
    },
  });
};

export const useUserList = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsersFn,
  });
};
