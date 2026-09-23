'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      Booking.belongsTo(models.Item, {
        foreignKey: 'itemId',
        as: 'item',
      });
    }
  }

  Booking.init(
    {
      itemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      renterName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Имя арендатора обязательно' },
        },
      },
    },
    {
      sequelize,
      modelName: 'Booking',
      tableName: 'Bookings',
    }
  );

  return Booking;
};
