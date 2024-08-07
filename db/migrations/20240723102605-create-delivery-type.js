/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DeliveryTypes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.TEXT,
      },
      requireFullName: {
        type: Sequelize.TEXT,
      },
      requiresAddress: {
        type: Sequelize.BOOLEAN,
      },
      requiresPhoneNumber: {
        type: Sequelize.BOOLEAN,
      },
      requiresPickupPoint: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable('DeliveryTypes');
  },
};
