export default (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    otpgenerateTime: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  return User;
};
