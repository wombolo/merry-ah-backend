'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    userType: DataTypes.STRING,
    signUpType: DataTypes.STRING,
    isVerified: DataTypes.INTEGER
  }, {});
  User.associate = (models) => {
    // associations can be defined here
  };
  return User;
};