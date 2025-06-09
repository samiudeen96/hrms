import db from "../models/index.js";

const { Role } = db;

const getAllRole = async (req, res) => {
  const roles = await Role.findAll();

  if (roles.length === 0) {
    res.status(404).json({
      success: false,
      message: "Not found",
    });
  }

  res.status(201).json({
    success: true,
    message: "fetched Successfully",
    roles,
  });
};

export default getAllRole;
