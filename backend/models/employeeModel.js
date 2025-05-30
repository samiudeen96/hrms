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
        allowNull: false,
      },
      dob: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      phone: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      emg_contact: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      tableName: "employees",
    }
  );

  // Hook to auto-generate emp_code after employee is created
  Employee.afterCreate(async (employee, options) => {
    const Department = sequelize.models.Department;

    const getDept = await Department.findByPk(employee.dept_id);
    const dept_code = getDept?.sub_name || "GEN";

    const year = new Date(employee.joining_date).getFullYear();

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

    const counter = String(count).padStart(4, "0"); // count already includes this record
    const generatedCode = `EMP-${dept_code}-${year}-${counter}`;

    // Update employee's emp_code
    employee.emp_code = generatedCode;
    await employee.save({ transaction: options.transaction }); 
  });

  return Employee;
};
