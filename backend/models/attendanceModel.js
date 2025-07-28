export default (sequelize, DataTypes) => {
  const Attendance = sequelize.define(
    "Attendance",
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
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
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
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      check_in: {
        type: DataTypes.DATE,
      },
      check_out: {
        type: DataTypes.DATE,
      },
      break_in: {
        type: DataTypes.DATE,
      },
      break_out: {
        type: DataTypes.DATE,
      },

      total_working_seconds: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.ENUM("present", "absent", "leave"),
        defaultValue: "absent",
      },
      reason: DataTypes.TEXT,
      created_by: DataTypes.STRING,
    },
    {
      timestamps: true,
      tableName: "attendances",
    }
  );

  return Attendance;
};
