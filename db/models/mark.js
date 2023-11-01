const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Mark extends Model {
    static associate({ ModelSneaker }) {
      this.hasMany(ModelSneaker, { foreignKey: 'id' });
    }
  }
  Mark.init({
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
    modelName: 'Mark',
  });
  return Mark;
};
