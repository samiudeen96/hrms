import db from "../models/index.js";

const roleSeed = async () => {
  try {
    await db.sequelize.sync();

    const roles = [{ name: "admin" }, { name: "employee" }];

    await db.Role.bulkCreate(roles);
    console.log("Roles seeded successfully");
  } catch (error) {
    console.log("Error seeding roles: ", error);
  } finally {
    await db.sequelize.close();
  }
};

roleSeed();
