import db from "../models/index.js";

const deptSeed = async () => {
  try {
    await db.sequelize.sync();

    const dept = [
      { name: "Human Resources", sub_name: "HR", description: "" },
      { name: "Software Development", sub_name: "SD", description: "" },
      { name: "Quality Assurance", sub_name: "QA", description: "" },
      { name: "UI/UX Design", sub_name: "UI", description: "" },
      { name: "Data & Analytics", sub_name: "DA", description: "" },
    ];

    await db.Department.bulkCreate(dept, { individualHooks: true }); // ✅ IMPORTANT
    console.log("Departments seeded successfully");
  } catch (error) {
    console.log("Error seeding departments: ", error);
  } finally {
    await db.sequelize.close();
  }
};

deptSeed();
