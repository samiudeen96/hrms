// hooks/attendanceHook.js
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAttendanceFn,
  getDailyAttendanceFn,
  markAttendanceFn,
} from "../services/attendanceService";

export const useMarkAttendance = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: markAttendanceFn, // ✅ Don't call it here
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mark"] });
    },
  });
};

export const useGetAttendance = (userUuid) => {
  return useQuery({
    queryKey: ["getAttendance", userUuid], // 👈 unique per user
    queryFn: getAttendanceFn,
    enabled: !!userUuid, // avoid calling without user
    staleTime: 0,
    cacheTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
};

export const useDailyAttendance = () => {
  return useQuery({
    queryKey: ["dailyAttendance"],
    queryFn: getDailyAttendanceFn
  })
};
