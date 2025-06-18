import express from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { registerEmployee, employeeProfile, createEmp, employees } from "../controllers/employeeController.js";
import { userDeptList } from "../controllers/departmentController.js";

const employeeRouter = express.Router();

employeeRouter.use(requireAuth);

employeeRouter.post("/register", registerEmployee);
employeeRouter.get("/profile", employeeProfile)

employeeRouter.post("/create", createEmp)
employeeRouter.get("/list", employees)


export default employeeRouter;