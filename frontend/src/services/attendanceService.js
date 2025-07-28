import API from "../api/axios";
import { ATTENDANCE_ENDPOINTS } from "../api/endpoints/attendance";

export const markAttendanceFn = async (updatedData) => {
  const res = await API.post(ATTENDANCE_ENDPOINTS.MARK, updatedData);
  return res.data;
};

export const getAttendanceFn = async () => {
  try {
    const res = await API.get(ATTENDANCE_ENDPOINTS.MARKED);
    return res.data.attendance;
  } catch (error) {
    if (error.response?.status === 404) return null;
    throw error;
  }
};

export const getDailyAttendanceFn = async () => {
  const res = await API.get(ATTENDANCE_ENDPOINTS.DAILYATTENDANCE);
  return res.data.todayAttendance;
};
