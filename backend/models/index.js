import Sequelize, { DataTypes } from "sequelize";
import dbConfig from "../config/dbConfig.js";
import tenantModel from "./tenantModel.js";
import roleModel from "./roleModel.js";
import userModal from "./userModal.js";
import departmentModel from "./departmentModel.js";
import positionModel from "./positionModel.js";

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
db.Position = positionModel(sequelize, Sequelize)

db.Role.hasMany(db.Tenant, { foreignKey: "role_id" });
db.Tenant.belongsTo(db.Role, { as: "role", foreignKey: "role_id" });

db.Role.hasMany(db.User, { foreignKey: "role_id" });
db.User.belongsTo(db.Role, { as: "role", foreignKey: "role_id" });

export default db;
