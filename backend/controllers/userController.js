import jwt from "jsonwebtoken";
import db from "../models/index.js";
import validator from "validator";
import bcrypt from "bcrypt";
import { Sequelize } from "sequelize";

const { User, Role } = db;

const createToken = (data) => {
  return jwt.sign({ id: data.id, email: data.email }, process.env.JWT_SECRET);
};

const create = async (req, res) => {
  // console.log(req.user);
  const tenant_id = req.user.id;
  try {
    const { role_id, firstName, lastName, email, password, confirmPassword } =
      req.body;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all the required field",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password doesn't match with confirm password!",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Checking Employer with email already exists or not
    const existingUser = await User.findOne({
      where: { tenant_id, email: normalizedEmail },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // Validating email format & strong password
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Email is invalid" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    // Hashing Employer password
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(password, salt);

    const newUser = {
      tenant_id,
      role_id,
      firstName,
      lastName,
      email: normalizedEmail,
      password: hashedPwd,
    };

    // console.log(newUser);

    // const user = await User.create(newUser);

    const latestUser = await User.findOne({
      where: { tenant_id },
      order: [["sl_no", "DESC"]],
    });

    const user = await User.create({
      ...newUser,
      sl_no: latestUser ? latestUser.sl_no + 1 : 1,
    });

    // Create jwt(Json Web Token)
    const token = createToken(user);
    res.status(201).json({
      success: true,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      errors: error.errors || [],
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(409).json({
        success: false,
        message: "Please fill all the required fields",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Email is invalid",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      where: { email: normalizedEmail },
      include: {
        model: Role,
        as: "role",
        attributes: ["name"],
      },
    });

    if (!user) {
      return res.status(409).json({
        success: false,
        message: "Employee is not exists",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    const name = `${user.firstName} ${user.lastName}`;

    if (isMatch) {
      const token = createToken(user);
      res.status(201).json({
        success: true,
        token,
        loggedData: {
          uuid: user.uuid,
          name: name,
          role: user.role.name,
          status: user.status,
        },
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const list = async (req, res) => {
  const tenant_id = req.user.id;
  try {
    const users = await User.findAll({
      where: { tenant_id },
      attributes: {
        exclude: ["password"],
        include: [
          [
            Sequelize.literal(`
              CONCAT(
                UPPER(LEFT(firstName, 1)),
                LOWER(SUBSTRING(firstName, 2)),
                ' ',
                UPPER(LEFT(lastName, 1)),
                LOWER(SUBSTRING(lastName, 2))
              )
            `),
            "fullName",
          ],
        ],
      },
      include: {
        model: Role,
        as: "role",
        attributes: ["name"],
      },
    });

    const formattedUsers = users.map((user) => ({
      ...user.toJSON(),
      sl_no: String(user.sl_no).padStart(2, "0"),
    }));

    if (formattedUsers.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Users not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Users list fetched successfully",
      users: formattedUsers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      errors: error.errors || [],
    });
  }
};

export { create, list, login };



