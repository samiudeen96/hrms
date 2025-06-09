import db from "../models/index.js";

const roleSeeder = async () => {
  try {
    await db.sequelize.sync();

    const roles = [
      { name: "admin" },
      { name: "hr_manager" },
      { name: "employee" },
    ];

    await db.Role.bulkCreate(roles);
    console.log("Roles seeded successfully");
  } catch (error) {
    console.log("Error seeding roles: ", error);
  } finally {
    await db.sequelize.close();
  }
};

roleSeeder();
