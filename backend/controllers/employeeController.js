import db from "../models/index.js";

const { User, Employee, Role } = db;

const createEmployee = async (req, res) => {
  // console.log(req.user.id);
  const user_id = req.user.id;

  try {
    const {
      // user_id, // existing user ID
      name,
      profile_picture,
      dept_id,
      emp_code,
      position_id,
      joining_date,
      salary,
      phone,
      address_id,
      gender,
      dob,
      emg_contact,
    } = req.body;

    // ✅ Step 1: Update User
    const user = await User.findByPk(user_id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.name = name;
    user.profile_picture = profile_picture;
    await user.save();

    // ✅ Step 2: Create Employee
    const employee = await Employee.create({
      user_id,
      dept_id,
      emp_code,
      position_id,
      joining_date,
      salary,
      phone,
      address_id,
      gender,
      dob,
      emg_contact,
    });

    res.status(201).json({
      success: true,
      message: "Employee created and user updated successfully",
      employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getEmpInfo = async (req, res) => {
  try {
    const { id } = req.user;

    const empInfo = await Employee.findOne({
      where: { user_id: id },
      include: [
        {
          model: User, as: "user",
          attributes: ["name", "profile_picture", "status"],
          include: [
            {
              model: Role, as: "role",
              attributes: ["name"], // ⬅ this gives you the role name
            },
          ],
        },
      ],
    });

    console.log(empInfo);

    res.status(201).json({
      success: true,
      empInfo,
    });
  } catch (error) {}
};

export { createEmployee, getEmpInfo };
