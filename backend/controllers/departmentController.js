import db from "../models/index.js";

const { Department, Position } = db;

export const createDept = async (req, res) => {
  try {
    console.log(req.body);

    const { deptName, subDepartment } = req.body;

    if (!deptName || !subDepartment) {
      return res.status(409).json({
        success: false,
        message: "Please fill all the requirds",
      });
    }

    const newDept = {
      name: deptName,
      sub_name: subDepartment,
    };

    const existingName = await Department.findOne({
      where: { name: deptName },
    });

    if (existingName) {
      return res.status(409).json({
        success: false,
        message: "Department already exist",
      });
    }

    await Department.create(newDept);

    res.status(201).json({
      success: true,
      message: "Department created Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      errors: error.errors || [],
    });
  }
};

export const deptList = async (req, res) => {
  try {
    const departments = await Department.findAll();

    if (departments.length === 0) {
      res.status(404).json({
        success: false,
        message: "List not found",
      });
    }

    res.status(201).json({
      success: true,
      message: "fetched successfully",
      departments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      errors: error.errors || [],
    });
  }
};

export const createPosition = async (req, res) => {
  try {
    console.log(req.body);

    const { dept_id, positionName } = req.body;

    if (!dept_id) {
      return res.status(409).json({
        success: false,
        message: "Select department first",
      });
    }

    if (!positionName) {
      return res.status(409).json({
        success: false,
        message: "Please fill all the requirds",
      });
    }

    const existingName = await Position.findOne({
      where: { name: positionName },
    });

    if (existingName) {
      return res.status(409).json({
        success: false,
        message: "Position already exist",
      });
    }

    const newPosition = {
      dept_id,
      name: positionName,
    };

    await Position.create(newPosition);

    res.status(201).json({
      success: true,
      message: "Position created Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      errors: error.errors || [],
    });
  }
};
