/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcrypt');
const { Admin } = require('../models');

module.exports = {
  async up() {
    await Admin.bulkCreate([{
      login: 'pdadmin',
      password: await bcrypt.hash('pdPDbotAdminka', 10),
    }]);
  },

  async down() {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
