const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    static associate({ ModelSneaker }) {
      this.belongsTo(ModelSneaker, { foreignKey: 'id' });
    }
  }
  Photo.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    mainPhoto: {
      type: DataTypes.TEXT,
    },
    two: {
      type: DataTypes.TEXT,
    },
    three: {
      type: DataTypes.TEXT,
    },
    four: {
      type: DataTypes.TEXT,
    },
    five: {
      type: DataTypes.TEXT,
    },
    six: {
      type: DataTypes.TEXT,
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
    modelName: 'Photo',
  });
  return Photo;
};
