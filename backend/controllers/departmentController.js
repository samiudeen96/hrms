import db from "../models/index.js";

const { Department, Position, User } = db;

export const createDept = async (req, res) => {
  const tenant_id = req.user.id;
  try {
    const { deptName, subDepartment } = req.body;

    if (!deptName || !subDepartment) {
      return res.status(409).json({
        success: false,
        message: "Please fill all the requirds",
      });
    }

    const existingName = await Department.findOne({
      where: { tenant_id, name: deptName },
    });

    if (existingName) {
      return res.status(409).json({
        success: false,
        message: "Department already exist",
      });
    }

    const newDept = {
      name: deptName,
      sub_name: subDepartment,
      tenant_id,
    };

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
  const tenant_id = req.user.id;
  // console.log(req);

  try {
    const departments = await Department.findAll({
      where: { tenant_id },
    });

    if (departments.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No departments found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Fetched successfully",
      departments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      errors: error.errors || [],
    });
  }
};

export const createPosition = async (req, res) => {
  const tenant_id = req.user.id;
  try {
    // console.log(req.body);

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
      where: { tenant_id, name: positionName },
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
      tenant_id,
    };

    await Position.create(newPosition);

    return res.status(201).json({
      success: true,
      message: "Position created Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      errors: error.errors || [],
    });
  }
};

export const positionList = async (req, res) => {
  const tenant_id = req.user.id;
  try {
    const positions = await Position.findAll({ where: { tenant_id } });

    if (positions.length === 0) {
      return res.status(404).json({
        success: false,
        message: "List not found",
      });
    }

    return res.status(201).json({
      success: true,
      message: "fetched successfully",
      positions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      errors: error.errors || [],
    });
  }
};

export const userDeptList = async (req, res) => {
  const user_id = req.user.id;


  try {
    const getTenantIdFromUser = await User.findOne({ where: user_id });

    const tenant_id = getTenantIdFromUser.tenant_id;

    const departments = await Department.findAll({
      where: { tenant_id },
    });

    if (departments.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No departments found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Fetched successfully",
      departments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      errors: error.errors || [],
    });
  }
};

export const userPositionList = async (req, res) => {
  const user_id = req.user.id;

  

  try {
    const getTenantIdFromUser = await User.findOne({ where: user_id });

    const tenant_id = getTenantIdFromUser.tenant_id;

    const positions = await Position.findAll({ where: { tenant_id } });

    if (positions.length === 0) {
      return res.status(404).json({
        success: false,
        message: "List not found",
      });
    }

    return res.status(201).json({
      success: true,
      message: "fetched successfully",
      positions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      errors: error.errors || [],
    });
  }
};
