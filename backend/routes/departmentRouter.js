import express from "express";
import { createDept, createPosition, deptList, positionList, userDeptList, userPositionList } from "../controllers/departmentController.js";
import { requireAuth } from "../middleware/requireAuth.js";

const deptRouter = express.Router();

deptRouter.use(requireAuth);

deptRouter.post("/createDepartment", createDept);
deptRouter.get("/departments", deptList)
deptRouter.post("/createPosition", createPosition)
deptRouter.get("/positions", positionList)
deptRouter.get("/userDeptList", userDeptList)
deptRouter.get("/userPositionList", userPositionList)


export default deptRouter;