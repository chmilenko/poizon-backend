const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    static associate() {
    }
  }
  Admin.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    login: {
      type: DataTypes.TEXT,
    },
    password: {
      type: DataTypes.TEXT,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'Admin',
  });
  return Admin;
};
