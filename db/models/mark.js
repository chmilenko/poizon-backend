const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Mark extends Model {
    static associate({ ModelSneaker }) {
      Mark.hasMany(ModelSneaker, { foreignKey: 'mark_id' });
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
