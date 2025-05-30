import db from "../models/index.js";

const { Department, Position } = db;

const getAllDepartments = async (req, res) => {
  try {
    const data = await Department.findAll({
      include: {
        model: Position, as: "positions",
        attributes: ["id", "name"], // Optional: limit returned fields
      },
    });

    if (data.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Not found..",
      });
    }

    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export default getAllDepartments;
