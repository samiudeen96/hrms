export default (sequelize, DataTypes) => {
  const Department = sequelize.define(
    "Department",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      tenant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "tenants",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      dept_code: {
        type: DataTypes.STRING,
        allowNull: true, // Will be generated after creation
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true,
      },
      sub_name: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      timestamps: true,
      tableName: "departments",
    }
  );

  // Generate dept_code after creation
  Department.afterCreate(async (department, options) => {
    const prefix = department.sub_name || "GEN";
    const paddedId = String(department.id).padStart(4, "0");
    const generatedCode = `DEPT-${prefix.toUpperCase()}-${paddedId}`;

    // Only update if dept_code not set manually
    if (!department.dept_code) {
      department.dept_code = generatedCode;
      await department.save({ hooks: false }); // avoid infinite loop
    }
  });

  return Department;
};
