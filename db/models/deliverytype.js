const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DeliveryType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Order }) {
      this.hasMany(Order, { foreignKey: 'delivery_type_id' });
    }
  }
  DeliveryType.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.TEXT,
      unique: true,
    },
    requireFullName: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    requiresAddress: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    requiresPhoneNumber: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
    modelName: 'DeliveryType',
  });
  return DeliveryType;
};
