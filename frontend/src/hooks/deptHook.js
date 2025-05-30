import { useQuery } from "@tanstack/react-query";
import { getList } from "../services/departmentServices";

export const useDptList = () => {
  return useQuery({
    queryKey: ["department"],
    queryFn: getList,
  });
};
