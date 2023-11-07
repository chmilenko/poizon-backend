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
    model_sneaker_id: {
      type: DataTypes.INTEGER,
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
