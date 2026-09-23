'use strict';

const { Item, Booking } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up() {
    const catalog = await Item.findAll();
    const byTitle = Object.fromEntries(catalog.map((item) => [item.title, item.id]));

    await Booking.bulkCreate([
      {
        itemId: byTitle['Дрель-шуруповерт Makita'],
        startDate: '2026-09-10',
        endDate: '2026-09-11',
        renterName: 'Анна Смирнова',
      },
      {
        itemId: byTitle['Перфоратор Bosch'],
        startDate: '2026-09-20',
        endDate: '2026-09-22',
        renterName: 'Пётр Иванов',
      },
      {
        itemId: byTitle['Проектор Epson'],
        startDate: '2026-10-01',
        endDate: '2026-10-02',
        renterName: 'ООО «Праздник»',
      },
      {
        itemId: byTitle['Фотоаппарат Canon EOS'],
        startDate: '2026-09-15',
        endDate: '2026-09-15',
        renterName: 'Мария Кузнецова',
      },
    ]);
  },

  async down() {
    await Booking.destroy({ where: {} });
  },
};
