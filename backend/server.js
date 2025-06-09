import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./models/index.js";
import userRouter from "./routes/userRoute.js";
import tenantRouter from "./routes/tenantRouter.js";
import deptRouter from "./routes/departmentRouter.js";
dotenv.config();

db.sequelize.sync(); // Create if not exists
// db.sequelize.sync({ force: true }); // Drops and re-creates
// db.sequelize.sync({ alter: true }); // Alters existing to match model

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("HRMS API is running...");
});

// routes

app.use("/api/tenant", tenantRouter);

app.use("/api/user", userRouter)

app.use("/api/dept", deptRouter)

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on the port ${port}`);
});
