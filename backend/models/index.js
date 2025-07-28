import Sequelize, { DataTypes } from "sequelize";
import dbConfig from "../config/dbConfig.js";
import tenantModel from "./tenantModel.js";
import roleModel from "./roleModel.js";
import userModal from "./userModal.js";
import departmentModel from "./departmentModel.js";
import positionModel from "./positionModel.js";
import employeeModel from "./employeeModel.js";
import attendanceModel from "./attendanceModel.js";
// import attendanceModel from "./attendanceModel.js"

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

db.Tenant = tenantModel(sequelize, Sequelize.DataTypes);
db.Role = roleModel(sequelize, Sequelize.DataTypes);
db.User = userModal(sequelize, Sequelize.DataTypes);
db.Department = departmentModel(sequelize, Sequelize.DataTypes);
db.Position = positionModel(sequelize, Sequelize.DataTypes);
db.Employee = employeeModel(sequelize, Sequelize.DataTypes);
db.Attendance = attendanceModel(sequelize, Sequelize.DataTypes);

db.Role.hasMany(db.Tenant, { foreignKey: "role_id" });
db.Tenant.belongsTo(db.Role, { as: "role", foreignKey: "role_id" });

db.Role.hasMany(db.User, { foreignKey: "role_id" });
db.User.belongsTo(db.Role, { as: "role", foreignKey: "role_id" });

db.Tenant.hasMany(db.Department, { foreignKey: "tenant_id" });
db.Department.belongsTo(db.Tenant, { foreignKey: "tenant_id" });

db.Tenant.hasMany(db.Position, { foreignKey: "tenant_id" });
db.Position.belongsTo(db.Tenant, { foreignKey: "tenant_id" });

db.Tenant.hasMany(db.User, { foreignKey: "tenant_id" });
db.User.belongsTo(db.Tenant, { foreignKey: "tenant_id" });

db.User.hasOne(db.Employee, { as: "employee", foreignKey: "user_id" });
db.Employee.belongsTo(db.User, { as: "user", foreignKey: "user_id" });

db.Department.hasMany(db.Employee, { foreignKey: "dept_id" });
db.Employee.belongsTo(db.Department, {
  as: "department",
  foreignKey: "dept_id",
});

db.User.hasMany(db.Attendance, { foreignKey: "user_id" });
db.Attendance.belongsTo(db.User, { as: "user", foreignKey: "user_id" });

db.Position.hasMany(db.Employee, { foreignKey: "position_id" });
db.Employee.belongsTo(db.Position, {
  as: "position",
  foreignKey: "position_id",
});

export default db;
