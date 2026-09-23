'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    isAvailableOn(date) {
      const day = String(date).slice(0, 10);
      const booked = this.bookedDates || [];
      return !booked.some((value) => String(value).slice(0, 10) === day);
    }

    static associate(models) {
      Item.hasMany(models.Booking, {
        foreignKey: 'itemId',
        as: 'bookings',
        onDelete: 'CASCADE',
      });
    }
  }

  Item.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Название обязательно' },
        },
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Категория обязательна' },
        },
      },
      pricePerDay: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: { args: [0], msg: 'Цена за день не может быть отрицательной' },
        },
      },
      bookedDates: {
        type: DataTypes.ARRAY(DataTypes.DATEONLY),
        allowNull: false,
        defaultValue: [],
      },
      deposit: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: { args: [0], msg: 'Залог не может быть отрицательным' },
        },
      },
    },
    {
      sequelize,
      modelName: 'Item',
      tableName: 'Items',
    }
  );

  return Item;
};
