const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    static associate({ ModelSneaker }) {
      this.belongsTo(ModelSneaker, { foreignKey: 'model_id' });
    }
  }
  Photo.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.TEXT,
    },
    photo: {
      type: DataTypes.TEXT,
    },
    model_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
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
    modelName: 'Photo',
  });
  return Photo;
};
