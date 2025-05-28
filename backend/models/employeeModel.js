export default (sequelize, DataTypes) => {
  const Employee = sequelize.define(
    "Employee",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      dept_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "departments",
          key: "id",
        },
      },
      emp_code: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      position_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "positions",
          key: "id",
        },
      },
      joining_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      salary: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      gender: {
        type: DataTypes.ENUM("Male", "Female"),
        // defaultValue: "Male",
        allowNull: false,
      },
      dob: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      phone: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      emg_contact: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      tableName: "employees",
    }
  );

  // Add a hook to generate emp_code
  Employee.beforeCreate(async (employee, options) => {
    // Get the department model
    const Department = sequelize.models.Department;

    // Get the department code like "IT"
    const getDept = await Department.findByPk(employee.dept_id);

    const dept_code = getDept?.sub_name || "GEN"; 

    // Extract year from joining_date
    const year = new Date(employee.joining_date).getFullYear();

    // Count how many employees already joined in that dept/year
    const count = await Employee.count({
      where: {
        dept_id: employee.dept_id,
        joining_date: {
          [sequelize.Sequelize.Op.between]: [
            new Date(`${year}-01-01`),
            new Date(`${year}-12-31`),
          ],
        },
      },
    });

    const counter = String(count + 1).padStart(4, "0");
    employee.emp_code = `EMP-${dept_code}-${year}-${counter}`;
  });

  return Employee;
};
