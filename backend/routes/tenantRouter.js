import express from "express";
import { login, signup } from "../controllers/tenantController.js";
import getAllRole from "../controllers/roleController.js";

const tenantRouter = express.Router();

tenantRouter.post("/signup", signup);
// tenantRouter.post("/createUser", createUser);
tenantRouter.post("/login", login);

tenantRouter.get("/getRoles", getAllRole);

export default tenantRouter;
