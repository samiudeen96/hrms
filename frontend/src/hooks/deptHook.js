import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import {
  createDeptFn,
  createPositionFn,
  deptListFn,
  positionListFn,
  userDeptListFn,
  userPositionListFn,
} from "../services/departmentServices";

// admin list
export const useDptCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDeptFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["department"] });
    },
  });
};

export const useDeptList = () => {
  return useQuery({
    queryKey: ["deptList"],
    queryFn: deptListFn,
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

export const usePositionList = () => {
  return useQuery({
    queryKey: ["positionList"],
    queryFn: positionListFn,
  });
};

export const useUserDeptList = () => {
  return useQuery({
    queryKey: ["userDeptList"],
    queryFn: userDeptListFn,
  });
};

export const useUserPositionList = () => {
  return useQuery({
    queryKey: ["userPositionList"],
    queryFn: userPositionListFn,
  });
};
