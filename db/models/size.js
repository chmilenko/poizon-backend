const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Size extends Model {
    static associate({ ModelSneaker }) {
      this.belongsTo(ModelSneaker, { foreignKey: 'model_sneaker_id' });
    }
  }
  Size.init({
    size: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    model_sneaker_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ModelSneakers',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Size',
  });
  return Size;
};
