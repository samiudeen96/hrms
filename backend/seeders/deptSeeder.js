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
      {
        dept_code: "",
        name: "Software Development",
        sub_name: "SD",
        description: "",
      },
      {
        dept_code: "",
        name: "Quality Assurance",
        sub_name: "QA",
        description: "",
      },
      {
        dept_code: "",
        name: "UI/UX Design",
        sub_name: "UI",
        description: "",
      },
      {
        dept_code: "",
        name: "Data & Analytics",
        sub_name: "DA",
        description: "",
      },
    ];

    await db.Department.bulkCreate(dept);
    console.log("Departments seeded successfully");

  } catch (error) {
    console.log("Error seeding departments: ", error);
  } finally {
    await db.sequelize.close();
  }
};

deptSeed();
