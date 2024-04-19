const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    static associate({
      Size, Count, ModelSneaker, Order,
    }) {
      this.belongsTo(Order, { foreignKey: 'order_id' });
      this.belongsTo(Size, { foreignKey: 'size_id' });
      this.belongsTo(Count, { foreignKey: 'count_id' });
      this.belongsTo(ModelSneaker, { foreignKey: 'model_id' });
    }
  }
  OrderItem.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    model_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    size_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    count_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  }, {
    sequelize,
    modelName: 'OrderItem',
  });
  return OrderItem;
};
