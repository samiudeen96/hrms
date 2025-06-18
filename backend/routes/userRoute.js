import express from "express";
import { create, list, login } from "../controllers/userController.js";
import { requireAuth } from "../middleware/requireAuth.js";

const userRouter = express.Router();

userRouter.post("/create", requireAuth, create);
userRouter.post("/login", login);
userRouter.get("/list", requireAuth, list);

export default userRouter;
