const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    static associate({ User, ModelSneaker }) {
      this.belongsTo(User, { foreignKey: 'id' });
      this.belongsTo(ModelSneaker, { foreignKey: 'model_sneaker_id' });
    }
  }
  Favorite.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
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
    modelName: 'Favorite',
  });
  return Favorite;
};
