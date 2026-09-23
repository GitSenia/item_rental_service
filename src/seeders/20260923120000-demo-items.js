'use strict';

const { Item } = require('../models');

const items = [
  {
    title: 'Дрель-шуруповерт Makita',
    category: 'tools',
    pricePerDay: 500,
    bookedDates: ['2026-09-10', '2026-09-11'],
    deposit: 2000,
  },
  {
    title: 'Вечернее платье Черное',
    category: 'apparel',
    pricePerDay: 1500,
    bookedDates: [],
    deposit: 5000,
  },
  {
    title: 'Перфоратор Bosch',
    category: 'tools',
    pricePerDay: 800,
    bookedDates: ['2026-09-20', '2026-09-21', '2026-09-22'],
    deposit: 3000,
  },
  {
    title: 'Ноутбук Lenovo IdeaPad',
    category: 'electronics',
    pricePerDay: 900,
    bookedDates: [],
    deposit: 15000,
  },
  {
    title: 'Проектор Epson',
    category: 'electronics',
    pricePerDay: 1200,
    bookedDates: ['2026-10-01', '2026-10-02'],
    deposit: 8000,
  },
  {
    title: 'Костюм мужской классический',
    category: 'apparel',
    pricePerDay: 700,
    bookedDates: [],
    deposit: 4000,
  },
  {
    title: 'Болгарка DeWalt',
    category: 'tools',
    pricePerDay: 600,
    bookedDates: [],
    deposit: 2500,
  },
  {
    title: 'Фотоаппарат Canon EOS',
    category: 'electronics',
    pricePerDay: 1100,
    bookedDates: ['2026-09-15'],
    deposit: 12000,
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up() {
    await Item.bulkCreate(items);
  },

  async down() {
    await Item.destroy({ where: {}, truncate: true, cascade: true });
  },
};
