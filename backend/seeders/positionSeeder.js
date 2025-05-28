import db from "../models/index.js";

const position = async () => {
  try {
    await db.sequelize.sync();
    const roles = [
      {
        dept_id: 1,
        name: "HR Manager",
      },
      {
        dept_id: 1,
        name: "Talent Acquisition Specialist",
      },
      {
        dept_id: 2,
        name: "Frontend Developer",
      },
      {
        dept_id: 2,
        name: "Backend Developer",
      },
      {
        dept_id: 2,
        name: "Full Stack Developer",
      },
      {
        dept_id: 3,
        name: "QA Engineer",
      },
      {
        dept_id: 3,
        name: "Test Automation Engineer",
      },
      {
        dept_id: 4,
        name: "UX Designer",
      },
      {
        dept_id: 4,
        name: "UI Designer",
      },
      {
        dept_id: 5,
        name: "Data Analyst",
      },
      {
        dept_id: 5,
        name: "Data Scientist",
      },
    ];

    await db.Position.bulkCreate(roles);
    console.log("Error seeding Positions: ", error);
  } catch (error) {
    console.log("Positions created successfully");
  } finally {
    await db.sequelize.close();
  }
};

position();
