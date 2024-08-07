const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate({
      User, OrderItem, Status, DeliveryType, DeliveryData,
    }) {
      this.belongsTo(User, { foreignKey: 'user_id' });
      this.hasMany(OrderItem, { foreignKey: 'order_id' });
      this.belongsTo(Status, { foreignKey: 'status_id' });
      this.belongsTo(DeliveryType, { foreignKey: 'delivery_type_id' });
      this.hasOne(DeliveryData, { foreignKey: 'order_id' });
    }
  }
  Order.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // primaryKey: true,
    },
    delivery_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // primaryKey: true,
    },

    status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // primaryKey: true,
    },
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
