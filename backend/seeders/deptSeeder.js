import db from "../models/index.js";

const deptSeed = async () => {
  try {
    await db.sequelize.sync();
    const dept = [
      {
        dept_code: "",
        name: "Human Resources",
        sub_name: "HR",
        description: "",
      },
    ];
  } catch (error) {
    console.log("Error seeding roles: ", error);
  } finally {
    await db.sequelize.close();
  }
};

deptSeed();
