import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import {
  createDeptFn,
  createPositionFn,
  deptListFn,
} from "../services/departmentServices";

export const useDptCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDeptFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["department"] });
    },
  });
};

export const usePositionCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPositionFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["position"] });
    },
  });
};

export const useDeptList = () => {
  return useQuery({
    queryKey: ["deptList"],
    queryFn: deptListFn,
  });
};
