import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import {
  createEmployeeFn,
  employeeProfileFn,
  ListEmployeeFn,
  registerEmployeeFn,
} from "../services/employeeService";
import { setEmployeeData } from "../redux/reducers/employeeSlice";

export const useRegisterEmp = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: registerEmployeeFn,
    onSuccess: () => {
      // dispatch(setEmployeeData({ employeeInfo: data }));
      queryClient.invalidateQueries({ queryKey: ["registerEmp"] });
    },
  });
};

export const useEmpProfile = () => {
  return useQuery({
    queryKey: ["employeeProfile"],
    queryFn: employeeProfileFn,
  });
};


// admin

export const useCreateEmp = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEmployeeFn,
    onSuccess: () => {
      // dispatch(setEmployeeData({ employeeInfo: data }));
      queryClient.invalidateQueries({ queryKey: ["createEmp"] });
    },
  });
};

export const useListEmp = () => {
  return useQuery({
    queryKey: ["employeeList"],
    queryFn: ListEmployeeFn 
  })
};