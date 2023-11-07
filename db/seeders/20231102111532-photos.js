/** @type {import('sequelize-cli').Migration} */
const { Photo } = require('../models');

module.exports = {
  async up() {
    await Photo.bulkCreate([
      {
        mainPhoto: '/image/1.jpg',
        two: '/image/2.jpg',
        three: '/image/3.jpg',
        four: '/image/4.jpeg',
        five: '/image/5.jpeg',
        six: '/image/6.jpeg',
        model_sneaker_id: 2,
      },
    ]);
  },

  async down() {
    await Photo.destroy({ truncate: { cascade: true } });
  },
};
