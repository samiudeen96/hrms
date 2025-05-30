import Sequelize, { DataTypes } from "sequelize";
import dbConfig from "../config/dbConfig.js";
import userModel from "./userModel.js";
import roleModel from "./roleModel.js";
import departmentModel from "./departmentModel.js";
import positionModel from "./positionModel.js";
import addressModel from "./addressModel.js";
import employeeModel from "./employeeModel.js";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.PORT,
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected...");
  })
  .catch((err) => {
    console.log("Error", err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Role = roleModel(sequelize, Sequelize.DataTypes);
db.User = userModel(sequelize, Sequelize.DataTypes);
db.Department = departmentModel(sequelize, Sequelize.DataTypes);
db.Position = positionModel(sequelize, Sequelize.DataTypes);
db.Address = addressModel(sequelize, DataTypes);
db.Employee = employeeModel(sequelize, DataTypes);

// role
db.Role.hasMany(db.User, { foreignKey: "role_id" }); // One Role → Many Users
db.User.belongsTo(db.Role, { foreignKey: "role_id", as: 'role' }); // Each User → One Role

// In User model (optional but recommended)
db.User.hasOne(db.Employee, { foreignKey: "user_id", as: 'employee' });
// In Employee model
db.Employee.belongsTo(db.User, { foreignKey: "user_id", as: 'user' });

db.Department.hasMany(db.Position, { foreignKey: "dept_id", as: "positions" });
db.Position.belongsTo(db.Department, { foreignKey: "dept_id" });

db.Employee.belongsTo(db.Department, { foreignKey: "dept_id" });
db.Employee.belongsTo(db.Position, { foreignKey: "position_id" });
db.Address.belongsTo(db.Employee, { foreignKey: "emp_id" });

export default db;
