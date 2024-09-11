const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CountSize extends Model {
    static associate({ Size, Count, ModelSneaker }) {
      this.belongsTo(Size, { foreignKey: 'size_id' });
      this.belongsTo(Count, { foreignKey: 'count_id' });
      this.belongsTo(ModelSneaker, { foreignKey: 'model_id', onDelete: 'CASCADE' });
    }
  }
  CountSize.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    size_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    model_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      onDelete: 'CASCADE',
    },
    count_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
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
    modelName: 'CountSize',
  });
  return CountSize;
};
