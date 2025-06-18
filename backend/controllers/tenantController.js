import jwt from "jsonwebtoken";
import db from "../models/index.js";
import validator from "validator";
import bcrypt from "bcrypt";

const { Tenant, Role, User } = db;

const createToken = (data) => {
  return jwt.sign(
    { id: data.id, email: data.email },
    process.env.JWT_SECRET
  );
};

const signup = async (req, res) => {
  // console.log(req.body);
  try {
    const { orgName, name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all the required field",
      });
    }

    // Check if name already exists or not
    const nameExists = await Tenant.findOne({ where: { name } });

    if (nameExists) {
      return res.status(409).json({
        success: false,
        message: "Username already taken",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Checking Employer with email already exists or not
    const existingEmployer = await Tenant.findOne({
      where: { email: normalizedEmail },
    });

    if (existingEmployer) {
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

    const newTenant = {
      orgName,
      name,
      email: normalizedEmail,
      password: hashedPwd,
    };

    // console.log(newTenant);

    const employer = await Tenant.create(newTenant);

    // Create jwt(Json Web Token)
    const token = createToken(employer);
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

// const createUser = async (req, res) => {
//   console.log(req.body);
//   try {
//     const { role_id, firstName, lastName, email, password, confirmPassword } =
//       req.body;

//     if (!firstName || !lastName || !email || !password || !confirmPassword) {
//       return res.status(400).json({
//         success: false,
//         message: "Please fill in all the required field",
//       });
//     }

//     if (password !== confirmPassword) {
//       return res.status(400).json({
//         success: false,
//         message: "Password doesn't match with confirm password!",
//       });
//     }

//     // // Check if name already exists or not
//     // const nameExists = await User.findOne({ where: { name } });

//     // if (nameExists) {
//     //   return res.status(409).json({
//     //     success: false,
//     //     message: "Username already taken",
//     //   });
//     // }

//     const normalizedEmail = email.trim().toLowerCase();

//     // Checking Employer with email already exists or not
//     const existingUser = await User.findOne({
//       where: { email: normalizedEmail },
//     });

//     if (existingUser) {
//       return res.status(409).json({
//         success: false,
//         message: "User already exists",
//       });
//     }

//     // Validating email format & strong password
//     if (!validator.isEmail(email)) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Email is invalid" });
//     }

//     if (password.length < 6) {
//       return res.status(400).json({
//         success: false,
//         message: "Password must be at least 6 characters long",
//       });
//     }

//     // Hashing Employer password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPwd = await bcrypt.hash(password, salt);

//     const newUser = {
//       role_id,
//       firstName,
//       lastName,
//       email: normalizedEmail,
//       password: hashedPwd,
//     };

//     // console.log(newUser);

//     const user = await User.create(newUser);

//     // Create jwt(Json Web Token)
//     const token = createToken(user);
//     res.status(201).json({
//       success: true,
//       token,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//       errors: error.errors || [],
//     });
//   }
// };

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

    const normalizedEmail = email.trim().toLowerCase();

    const tenant = await Tenant.findOne({
      where: { email: normalizedEmail },
      include: {
        model: Role,
        as: "role",
        attributes: ["name"],
      },
    });

    if (!tenant) {
      return res.status(409).json({
        success: false,
        message: "Employer is not exists",
      });
    }


    const isMatch = await bcrypt.compare(password, tenant.password);

    if (isMatch) {
      const token = createToken(tenant);
      res.status(201).json({
        success: true,
        token,
        loggedData: {
          uuid: tenant.uuid,
          name: tenant.name,
          role: tenant.role.name,
          status: tenant.status,
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

export { signup, login };
