const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Count extends Model {
    static associate({ CountSize, OrderItem }) {
      this.hasMany(CountSize, { foreignKey: 'count_id' });
      this.hasMany(OrderItem, { foreignKey: 'count_id' });
    }
  }
  Count.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    count: {
      allowNull: false,
      unique: true,
      type: DataTypes.INTEGER,
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
    modelName: 'Count',
  });
  return Count;
};
