import express from "express";
import { create, list, login } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/create", create);
userRouter.post("/login", login);
userRouter.get("/list", list);

export default userRouter;
