import jwt from "jsonwebtoken";
import db from "../models/index.js";
import validator from "validator";
import bcrypt from "bcrypt";

const User = db.User;
const Role = db.Role;

const createToken = (user) => {
  return jwt.sign(
    { id: user.id, role_id: user.role_id },
    process.env.JWT_SECRET
  );
};

const signup = async (req, res) => {
  try {
    const { name, email, password, profile_picture, role_id, status } =
      req.body;

    // make fields are required

    if (!name || !email || !password || !role_id) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all the required field",
      });
    }

    // Check if name already exists
    const nameExists = await User.findOne({ where: { name } });

    if (nameExists) {
      return res.status(409).json({
        success: false,
        message: "Username already taken",
      });
    }

    const nornalizedEmail = email.toLowerCase();

    // Checking user with email already exists or not
    const existingUser = await User.findOne({
      where: { email: nornalizedEmail },
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

    if (password.length <= 6) {
      return res.status(400).json({
        success: false,
        message: "keep the password length minimum 6 characters",
      });
    }

    // Hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(password, salt);

    const newUser = {
      name,
      email: nornalizedEmail,
      password: hashedPwd,
      profile_picture,
      role_id,
      status,
    };

    // console.log(newUser);

    const user = await User.create(newUser);

    // const getRoleWithId = await Role.findByPk(user.role_id);

    // Create jwt(Json Web Token)
    const token = createToken(user);
    res.status(201).json({
      success: true,
      token,
    });

    //   const createUser = await db.User.
  } catch (error) {
    // console.error("Signup Error:", error);
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
      return res.status(400).json({
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

    const nornalizedEmail = email.toLowerCase();

    const user = await User.findOne({
      where: { email: nornalizedEmail },
      include: {
        model: Role,
        as: "role",
      },
    });

    if (!user) {
      return res.status(409).json({
        success: false,
        message: "User is not exists",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    // const getRoleWithId = await Role.findByPk(user.role_id);

    if (isMatch) {
      const token = createToken(user);
      res.status(201).json({
        success: true,
        token,
        user: {
          id: user.id,
          name: user.name,
          profile_picture: user.profile_picture,
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

const forgetPassword = async () => {};

const resetPassword = async () => {};

export { signup, login };
