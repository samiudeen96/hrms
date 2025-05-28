export default (sequelize, DataTypes) => {
  const Address = sequelize.define("Address", {
    id: {
      type: DataTypes.INTEGER,
      autoIncreament: true,
      primaryKey: true,
    },
    emp_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "employees",
        key: "id",
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    pincode: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    nationality: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  });

  return Address;
};
