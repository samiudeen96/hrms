import express from "express";
import getAllDepartments from "../controllers/departmentController.js";

const departmentRouter = express.Router();

// departmentRouter.use(requireAuth)

departmentRouter.get("/list", getAllDepartments);

export default departmentRouter;
