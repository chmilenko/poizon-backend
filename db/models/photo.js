const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ ModelSneaker }) {
      this.belongsTo(ModelSneaker, { foreignKey: 'model_sneaker_id ' });
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
    photoOne: {
      type: DataTypes.TEXT,
    },
    photoTwo: {
      type: DataTypes.TEXT,
    },
    photoThree: {
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
