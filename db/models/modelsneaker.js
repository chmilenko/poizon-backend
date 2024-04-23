const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ModelSneaker extends Model {
    static associate({
      Mark, Photo, CountSize,
    }) {
      ModelSneaker.belongsTo(Mark, { foreignKey: 'mark_id' });
      ModelSneaker.hasMany(Photo, { foreignKey: 'model_id' });
      ModelSneaker.hasMany(CountSize, { foreignKey: 'model_id' });
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
      primaryKey: true,
    },
    price: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
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
