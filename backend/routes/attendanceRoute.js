import express from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import {
    getDailyAttendanceByTenantId,
  getMarkedAttendance,
  markAttendance,
} from "../controllers/attendanceController.js";

const attendanceRouter = express.Router();

attendanceRouter.use(requireAuth);

attendanceRouter.post("/mark", markAttendance);

attendanceRouter.get("/getAttendance", getMarkedAttendance);

// admin
attendanceRouter.get("/todayAttendance", getDailyAttendanceByTenantId)

export default attendanceRouter;
