const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Size extends Model {
    static associate({ CountSize }) {
      this.hasMany(CountSize, { foreignKey: 'size_id' });
    }
  }
  Size.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    size: {
      type: DataTypes.TEXT,
      allowNull: false,
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
    modelName: 'Size',
  });
  return Size;
};
