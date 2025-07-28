import db from "../models/index.js";

const { Attendance, User, Employee } = db;

const cleanValue = (val) => (val === "" ? null : val);

export const markAttendance = async (req, res) => {
  const { id, tenant_id } = req.user;
  try {
    // const user_id = req.user?.id; // Ensure this is not undefined

    if (!id) return res.status(400).json({ message: "Unauthorized" });

    const {
      // tenant_id,
      check_in,
      break_in,
      break_out,
      check_out,
      total_working_seconds,
      date,
      status,
    } = req.body;

    const existing = await Attendance.findOne({
      where: { user_id: id, tenant_id, date },
    });

    const cleanData = {
      check_in: cleanValue(check_in),
      break_in: cleanValue(break_in),
      break_out: cleanValue(break_out),
      check_out: cleanValue(check_out),
      total_working_seconds: cleanValue(total_working_seconds),
      date,
      status,
    };

    if (existing) {
      await existing.update(cleanData);
      return res
        .status(200)
        .json({ message: "Attendance updated", data: existing });
    }

    const newEntry = await Attendance.create({
      ...cleanData,
      user_id: id,
      tenant_id,
    });

    return res
      .status(201)
      .json({ message: "Attendance marked", data: newEntry });
  } catch (error) {
    console.error("Attendance error:", error);
    return res
      .status(500)
      .json({ message: "Error marking attendance", error: error.message });
  }
};

export const getMarkedAttendance = async (req, res) => {
  const { id, tenant_id } = req.user;

  try {
    if (!id) return res.status(400).json({ message: "Unauthorized" });

    // Get today's date in YYYY-MM-DD format
    // const today = new Date().toISOString().split("T")[0];
    const today = new Date().toLocaleDateString("en-CA"); // "YYYY-MM-DD"

    const attendance = await Attendance.findOne({
      where: {
        user_id: id,
        tenant_id,
        date: today,
      },
    });

    if (!attendance) {
      return res.status(200).json({
        message: "No attendance for today",
        attendance: null,
      });
    }

    return res.status(200).json({
      message: "Fetched today's attendance",
      attendance,
    });
  } catch (error) {
    console.error("Error fetching attendance:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// admin
export const getDailyAttendanceByTenantId = async (req, res) => {
  const tenant_id = req.user.id;

  try {
    if (!tenant_id) {
      return res.status(409).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const today = new Date().toLocaleDateString("en-CA"); // "YYYY-MM-DD"

    // const todayAttendance = await Attendance.findAll({
    //   where: {
    //     tenant_id,
    //     date: today,
    //   },
    // });

    const todayAttendance = await Attendance.findAll({
      where: {
        tenant_id,
        date: today,
      },
      include: [
        {
          model: User,
          as: "user",
          include: [
            {
              model: Employee,
              as: "employee",
            },
          ],
        },
      ],
    });

    if (!todayAttendance || todayAttendance.length === 0) {
      return res.status(200).json({
        message: "No attendance for today",
        attendance: [],
      });
    }

    return res.status(200).json({
      message: "Fetched today's attendance",
      todayAttendance,
    });
    
  } catch (error) {
    console.error("Error fetching attendance:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
