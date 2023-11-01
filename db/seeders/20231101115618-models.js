/** @type {import('sequelize-cli').Migration} */
const { ModelSneaker } = require('../models');

module.exports = {
  async up() {
    await ModelSneaker.bulkCreate([
      { name: 'Air Jordan 6 Retro University Blue', mark_id: 1, price: 6780 },
      { name: 'Air Jordan 6 UNC', mark_id: 1, price: 68000 },
      { name: 'Dunk Low Ceramic', mark_id: 1, price: 7600 },
      { name: ' 2002r Rain Cloud', mark_id: 2, price: 8000 },
      { name: '530 white silver navy', mark_id: 2, price: 7000 },
      { name: '530 Beige Angora', mark_id: 2, price: 6100 },
      { name: 'Ramones', mark_id: 3, price: 6500 },
      { name: 'MMY Maison Margiela', mark_id: 3, price: 6500 },
      { name: 'ramones low', mark_id: 3, price: 6500 },
    ]);
  },

  async down() {
    await ModelSneaker.destroy({ truncate: { cascade: true } });
  },
};
