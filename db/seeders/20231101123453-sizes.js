/** @type {import('sequelize-cli').Migration} */
const { Size } = require('../models');

module.exports = {
  async up() {
    await Size.bulkCreate([
      { size: 45, model_sneaker_id: 1, count: 1 },
      { size: 43.5, model_sneaker_id: 1, count: 1 },
      { size: 44, model_sneaker_id: 1, count: 2 },
      { size: 41, model_sneaker_id: 2, count: 1 },
      { size: 45, model_sneaker_id: 2, count: 1 },
      { size: 46, model_sneaker_id: 2, count: 2 },
      { size: 44, model_sneaker_id: 3, count: 1 },
      { size: 40, model_sneaker_id: 3, count: 1 },
      { size: 46, model_sneaker_id: 3, count: 1 },
      { size: 45, model_sneaker_id: 4, count: 1 },
      { size: 45, model_sneaker_id: 4, count: 1 },
      { size: 45, model_sneaker_id: 4, count: 1 },
      { size: 39, model_sneaker_id: 5, count: 2 },
      { size: 41, model_sneaker_id: 5, count: 3 },
      { size: 42.5, model_sneaker_id: 5, count: 1 },
      { size: 44, model_sneaker_id: 6, count: 1 },
      { size: 41, model_sneaker_id: 6, count: 1 },
      { size: 42, model_sneaker_id: 6, count: 1 },
      { size: 44, model_sneaker_id: 7, count: 1 },
      { size: 41, model_sneaker_id: 7, count: 1 },
      { size: 37, model_sneaker_id: 7, count: 1 },
      { size: 41, model_sneaker_id: 8, count: 1 },
      { size: 45, model_sneaker_id: 8, count: 1 },
      { size: 44, model_sneaker_id: 8, count: 1 },
      { size: 45.5, model_sneaker_id: 9, count: 1 },
      { size: 47, model_sneaker_id: 9, count: 1 },
      { size: 41, model_sneaker_id: 9, count: 1 },

    ]);
  },

  async down() {
    await Size.destroy({ truncate: { cascade: true } });
  },
};
