const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate({ User, OrderItem }) {
      this.belongsTo(User, { foreignKey: 'user_id' });
      this.hasMany(OrderItem, { foreignKey: 'order_id' });
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
      primaryKey: true,
    },
    status: {
      type: DataTypes.ENUM('Новый', 'В работе', 'Выполнен', 'Отклонен'),
      allowNull: false,
      defaultValue: 'Новый',
    },
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
