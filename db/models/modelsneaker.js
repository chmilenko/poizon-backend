const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ModelSneaker extends Model {
    static associate({ Mark, Size }) {
      this.belongsTo(Mark, { foreignKey: 'mark_id' });
      // this.belongsTo(Favorite, { foreignKey: 'model_sneaker_id' });
      this.hasMany(Size, { foreignKey: 'model_sneaker_id' });
    }
  }
  ModelSneaker.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    mark_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Marks',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    price: {
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
    modelName: 'ModelSneaker',
  });
  return ModelSneaker;
};
