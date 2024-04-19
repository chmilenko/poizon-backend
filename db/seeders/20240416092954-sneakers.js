const {
  Mark, ModelSneaker, Size, Photo, Count, CountSize,
} = require('../models');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up() {
    await Mark.bulkCreate([
      { name: 'Nike' },
      { name: 'New Balance' },
      { name: 'Rick owens' },
    ]);
    await ModelSneaker.bulkCreate([
      { name: 'Air Jordan 6 Retro University Blue', mark_id: 1, price: 6780 },
      { name: 'Air Jordan 6 UNC', mark_id: 1, price: 68000 },
      { name: 'Dunk Low Ceramic', mark_id: 1, price: 7600 },
      { name: '2002r Rain Cloud', mark_id: 2, price: 8000 },
      { name: '530 white silver navy', mark_id: 2, price: 7000 },
      { name: '530 Beige Angora', mark_id: 2, price: 6100 },
      { name: 'Ramones', mark_id: 3, price: 6500 },
      { name: 'MMY Maison Margiela', mark_id: 3, price: 6500 },
      { name: 'ramones low', mark_id: 3, price: 6500 },
    ]);

    await Photo.bulkCreate([
      {
        name: 'mainPhoto',
        photo: '/image/1.jpg',
        model_id: 1,
      },
      {
        name: 'two',
        photo: '/image/2.jpg',
        model_id: 1,
      },
      {
        name: 'three',
        photo: '/image/3.jpg',
        model_id: 1,
      },
      {
        name: 'four',
        photo: '/image/4.jpg',
        model_id: 1,
      },
      {
        name: 'five',
        photo: '/image/5.jpg',
        model_id: 1,
      },
      {
        name: 'six',
        photo: '/image/6.jpg',
        model_id: 1,
      },
      {
        name: 'mainPhoto',
        photo: '/image/1.jpg',
        model_id: 2,
      },
      {
        name: 'two',
        photo: '/image/2.jpg',
        model_id: 2,
      },
      {
        name: 'three',
        photo: '/image/3.jpg',
        model_id: 2,
      },
      {
        name: 'four',
        photo: '/image/4.jpg',
        model_id: 2,
      },
      {
        name: 'five',
        photo: '/image/5.jpg',
        model_id: 2,
      },
      {
        name: 'six',
        photo: '/image/6.jpg',
        model_id: 2,
      },
      {
        name: 'mainPhoto',
        photo: '/image/1.jpg',
        model_id: 3,
      },
      {
        name: 'two',
        photo: '/image/2.jpg',
        model_id: 3,
      },
      {
        name: 'three',
        photo: '/image/3.jpg',
        model_id: 3,
      },
      {
        name: 'four',
        photo: '/image/4.jpg',
        model_id: 3,
      },
      {
        name: 'five',
        photo: '/image/5.jpg',
        model_id: 3,
      },
      {
        name: 'six',
        photo: '/image/6.jpg',
        model_id: 3,
      },
      {
        name: 'mainPhoto',
        photo: '/image/1.jpg',
        model_id: 4,
      },
      {
        name: 'two',
        photo: '/image/2.jpg',
        model_id: 4,
      },
      {
        name: 'three',
        photo: '/image/3.jpg',
        model_id: 4,
      },
      {
        name: 'four',
        photo: '/image/4.jpg',
        model_id: 4,
      },
      {
        name: 'five',
        photo: '/image/5.jpg',
        model_id: 4,
      },
      {
        name: 'six',
        photo: '/image/6.jpg',
        model_id: 4,
      },
      {
        name: 'mainPhoto',
        photo: '/image/1.jpg',
        model_id: 5,
      },
      {
        name: 'two',
        photo: '/image/2.jpg',
        model_id: 5,
      },
      {
        name: 'three',
        photo: '/image/3.jpg',
        model_id: 5,
      },
      {
        name: 'four',
        photo: '/image/4.jpg',
        model_id: 5,
      },
      {
        name: 'five',
        photo: '/image/5.jpg',
        model_id: 5,
      },
      {
        name: 'six',
        photo: '/image/6.jpg',
        model_id: 5,
      },
      {
        name: 'mainPhoto',
        photo: '/image/1.jpg',
        model_id: 6,
      },
      {
        name: 'two',
        photo: '/image/2.jpg',
        model_id: 6,
      },
      {
        name: 'three',
        photo: '/image/3.jpg',
        model_id: 6,
      },
      {
        name: 'four',
        photo: '/image/4.jpg',
        model_id: 6,
      },
      {
        name: 'five',
        photo: '/image/5.jpg',
        model_id: 6,
      },
      {
        name: 'six',
        photo: '/image/6.jpg',
        model_id: 6,
      },
      {
        name: 'mainPhoto',
        photo: '/image/1.jpg',
        model_id: 7,
      },
      {
        name: 'two',
        photo: '/image/2.jpg',
        model_id: 7,
      },
      {
        name: 'three',
        photo: '/image/3.jpg',
        model_id: 7,
      },
      {
        name: 'four',
        photo: '/image/4.jpg',
        model_id: 7,
      },
      {
        name: 'five',
        photo: '/image/5.jpg',
        model_id: 7,
      },
      {
        name: 'six',
        photo: '/image/6.jpg',
        model_id: 7,
      },
      {
        name: 'mainPhoto',
        photo: '/image/1.jpg',
        model_id: 8,
      },
      {
        name: 'two',
        photo: '/image/2.jpg',
        model_id: 8,
      },
      {
        name: 'three',
        photo: '/image/3.jpg',
        model_id: 8,
      },
      {
        name: 'four',
        photo: '/image/4.jpg',
        model_id: 8,
      },
      {
        name: 'five',
        photo: '/image/5.jpg',
        model_id: 8,
      },
      {
        name: 'six',
        photo: '/image/6.jpg',
        model_id: 8,
      },
      {
        name: 'mainPhoto',
        photo: '/image/1.jpg',
        model_id: 9,
      },
      {
        name: 'two',
        photo: '/image/2.jpg',
        model_id: 9,
      },
      {
        name: 'three',
        photo: '/image/3.jpg',
        model_id: 9,
      },
      {
        name: 'four',
        photo: '/image/4.jpg',
        model_id: 9,
      },
      {
        name: 'five',
        photo: '/image/5.jpg',
        model_id: 9,
      },
      {
        name: 'six',
        photo: '/image/6.jpg',
        model_id: 9,
      },
    ]);

    await Count.bulkCreate([
      { count: 0 },
      { count: 1 },
      { count: 2 },
      { count: 3 },
      { count: 4 },
      { count: 5 },
      { count: 6 },
      { count: 7 },
    ]);

    await Size.bulkCreate([
      { size: 36 },
      { size: 36.5 },
      { size: 37 },
      { size: 37.5 },
      { size: 38 },
      { size: 38.5 },
      { size: 39 },
      { size: 39.5 },
      { size: 40 },
      { size: 40.5 },
      { size: 41 },
      { size: 41.5 },
      { size: 42 },
      { size: 42.5 },
      { size: 43 },
      { size: 43.5 },
      { size: 44 },
      { size: 44.5 },
      { size: 45 },
      { size: 45.5 },
      { size: 46 },
      { size: 47 },
      { size: 48 },
    ]);

    await CountSize.bulkCreate([
      { size_id: 1, model_id: 1, count_id: 2 },
      { size_id: 5, model_id: 1, count_id: 4 },
      { size_id: 14, model_id: 1, count_id: 3 },
      { size_id: 19, model_id: 1, count_id: 2 },
      { size_id: 3, model_id: 2, count_id: 1 },
      { size_id: 11, model_id: 2, count_id: 4 },
      { size_id: 19, model_id: 2, count_id: 6 },
      { size_id: 20, model_id: 2, count_id: 4 },
      { size_id: 8, model_id: 3, count_id: 2 },
      { size_id: 9, model_id: 3, count_id: 2 },
      { size_id: 3, model_id: 3, count_id: 2 },
      { size_id: 4, model_id: 3, count_id: 1 },
      { size_id: 20, model_id: 4, count_id: 3 },
      { size_id: 9, model_id: 4, count_id: 3 },
      { size_id: 1, model_id: 4, count_id: 3 },
      { size_id: 3, model_id: 4, count_id: 2 },
      { size_id: 12, model_id: 5, count_id: 3 },
      { size_id: 2, model_id: 5, count_id: 3 },
      { size_id: 16, model_id: 5, count_id: 3 },
      { size_id: 2, model_id: 5, count_id: 6 },
      { size_id: 12, model_id: 6, count_id: 4 },
      { size_id: 19, model_id: 6, count_id: 4 },
      { size_id: 20, model_id: 6, count_id: 4 },
      { size_id: 10, model_id: 6, count_id: 2 },
      { size_id: 19, model_id: 7, count_id: 1 },
      { size_id: 20, model_id: 7, count_id: 3 },
      { size_id: 1, model_id: 7, count_id: 1 },
      { size_id: 5, model_id: 7, count_id: 1 },
      { size_id: 19, model_id: 8, count_id: 4 },
      { size_id: 2, model_id: 8, count_id: 4 },
      { size_id: 3, model_id: 8, count_id: 4 },
      { size_id: 1, model_id: 8, count_id: 2 },
      { size_id: 17, model_id: 9, count_id: 3 },
      { size_id: 15, model_id: 9, count_id: 3 },
      { size_id: 4, model_id: 9, count_id: 3 },
      { size_id: 5, model_id: 9, count_id: 1 },
    ]);
  },

  async down() {
    await Mark.destroy({ truncate: { cascade: true } });
    await Size.destroy({ truncate: { cascade: true } });
    await Photo.destroy({ truncate: { cascade: true } });
    await ModelSneaker.destroy({ truncate: { cascade: true } });
  },
};
