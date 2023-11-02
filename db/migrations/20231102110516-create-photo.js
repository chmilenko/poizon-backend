/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Photos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      mainPhoto: {
        type: Sequelize.TEXT,
      },
      photoOne: {
        type: Sequelize.TEXT,
      },
      photoTwo: {
        type: Sequelize.TEXT,
      },
      photoThree: {
        type: Sequelize.TEXT,
      },
      model_sneaker_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ModelSneakers',
          key: 'id',
        },
        onDelete: 'CASCADE',
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Photos');
  },
};
