/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CountSizes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      size_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Sizes',
          key: 'id',
        },
      },
      model_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ModelSneakers',
          key: 'id',
        },
      },
      count_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Counts',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('CountSizes');
  },
};
