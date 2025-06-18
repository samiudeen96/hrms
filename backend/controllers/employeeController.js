import { Sequelize } from "sequelize";
import db from "../models/index.js";

const { Employee, Department, User, Role, Position } = db;

// admin props

export const createEmp = async (req, res) => {
  try {
    const {
      user_id,
      dept_id,
      position_id,
      joining_date,
      gender,
      dob,
      address,
      city,
      pincode,
      country,
      nationality,
      phone,
      emg_contact,
    } = req.body;

    if (
      (!user_id,
      !dept_id ||
        !position_id ||
        !joining_date ||
        !gender ||
        !dob ||
        !address ||
        !city ||
        !pincode ||
        !country ||
        !nationality ||
        !phone ||
        !emg_contact)
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingEmp = await Employee.findOne({ where: { user_id } });

    if (existingEmp) {
      return res.status(409).json({
        success: false,
        message: "Employee has already registered",
      });
    }

    const employee = await Employee.create({
      user_id,
      dept_id,
      position_id,
      joining_date,
      gender,
      dob,
      address,
      city,
      pincode,
      country,
      nationality,
      phone,
      emg_contact,
    });

    return res.status(200).json({
      success: true,
      message: "Employee created and user updated successfully",
      employee,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      errors: error.errors || [],
    });
  }
};

export const employees = async (req, res) => {
  const tenant_id = req.user.id;

  try {
    // const empList = await User.findAll({
    //   where: { tenant_id },
    //   attributes: {
    //     exclude: ["password", "id", "tenant_id", "role_id", "firstName", "lastName", "status", "createdAt", "updatedAt" ],
    //     include: [
    //       [
    //         Sequelize.literal(`
    //           CONCAT(
    //             UPPER(LEFT(firstName, 1)),
    //             LOWER(SUBSTRING(firstName, 2)),
    //             ' ',
    //             UPPER(LEFT(lastName, 1)),
    //             LOWER(SUBSTRING(lastName, 2))
    //           )
    //         `),
    //         "fullName",
    //       ],
    //     ],
    //   },
    // });
    const empListRaw = await User.findAll({
      where: { tenant_id },
      attributes: {
        exclude: [
          "password",
          "id",
          "tenant_id",
          "role_id",
          "status",
          "createdAt",
          "updatedAt",
        ],
      },
      include: [
        {
          model: Employee,
          as: "employee",

          include: [
            {
              model: Department,
              as: "department",
              attributes: ["uuid", "dept_code", "name"],
            },
            {
              model: Position,
              as: "position",
              attributes: ["uuid", "name"],
            },
          ],
        },
      ],
    });

    const empList = empListRaw.map((user) => user.get({ plain: true }));
    res.status(200).json({
      success: true,
      empList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      errors: error.errors || [],
    });
  }
};

// Employee props

export const registerEmployee = async (req, res) => {
  const user_id = req.user.id;

  console.log(user_id);

  try {
    const {
      dept_id,
      position_id,
      joining_date,
      gender,
      dob,
      address,
      city,
      pincode,
      country,
      nationality,
      phone,
      emg_contact,
    } = req.body;

    if (
      !dept_id ||
      !position_id ||
      !joining_date ||
      !gender ||
      !dob ||
      !address ||
      !city ||
      !pincode ||
      !country ||
      !nationality ||
      !phone ||
      !emg_contact
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingEmp = await Employee.findOne({ where: { user_id } });

    if (existingEmp) {
      return res.status(409).json({
        success: false,
        message: "Employee has already registered",
      });
    }

    const employee = await Employee.create({
      user_id,
      dept_id,
      position_id,
      joining_date,
      gender,
      dob,
      address,
      city,
      pincode,
      country,
      nationality,
      phone,
      emg_contact,
    });

    return res.status(201).json({
      success: true,
      message: "Employee created and user updated successfully",
      employee,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      errors: error.errors || [],
    });
  }
};

export const employeeProfile = async (req, res) => {
  const user_id = req.user.id;

  try {
    if (!user_id) {
      return res.status(409).json({
        success: false,
        message: "Failed to fetch employee profile",
      });
    }

    const empProfile = await Employee.findOne({
      where: { user_id },
      include: {
        model: User,
        as: "user",
        attributes: ["firstName", "lastName", "email"],
      },
    });

    return res.status(201).json({
      success: true,
      empProfile,
    });
  } catch (error) {}
};
