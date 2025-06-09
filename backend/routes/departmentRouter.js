import express from "express";
import { createDept, createPosition, deptList } from "../controllers/departmentController.js";

const deptRouter = express.Router();

deptRouter.post("/create", createDept);
deptRouter.post("/createPosition", createPosition)
deptRouter.get("/list", deptList)

export default deptRouter;