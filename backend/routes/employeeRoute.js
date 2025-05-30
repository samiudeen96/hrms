import express from "express";
import { requireAuth, requireRoleId } from "../middleware/requireAuth.js";
import {
  createEmployee,
  getEmpInfo,
} from "../controllers/employeeController.js"; // Ensure `.js` if you're using ES Modules

const employeeRouter = express.Router();

// Protect all employee routes with authentication
employeeRouter.use(requireAuth);

// Route to create employee (only accessible by roles 1 and 2)
employeeRouter.post("/create", requireRoleId([1, 2]), createEmployee);
employeeRouter.get("/info",  getEmpInfo);

export default employeeRouter; // ✅ Export the router to use in main app
