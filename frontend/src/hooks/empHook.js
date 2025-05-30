import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { createFn, getInfoFn } from "../services/employeeService";
import { setCreateEmp } from "../redux/reducers/empInfoSlice";

export const useCreateEmp = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: createFn,
    onSuccess: (data) => {
      dispatch(setCreateEmp({ employee: data.employee }));
    },
  });
};

export const useEmpInfo = () => {
  return useQuery({
    queryKey: ["employee"],
    queryFn: getInfoFn,
    enabled: false, // ⛔ prevent auto-fetch
  });
};
