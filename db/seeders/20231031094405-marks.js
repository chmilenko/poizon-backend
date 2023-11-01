/** @type {import('sequelize-cli').Migration} */
const { Mark } = require('../models');

module.exports = {
  async up() {
    await Mark.bulkCreate([
      { name: 'Nike' },
      { name: 'New Balance' },
      { name: 'Rick owens' },
    ]);
  },

  async down() {
    await Mark.destroy({ truncate: { cascade: true } });
  },
};
