'use strict';

const { Item } = require('../models');

function parseId(value) {
  const id = Number(value);
  if (!Number.isInteger(id) || id <= 0) {
    return null;
  }
  return id;
}

function createError(body) {
  const { title, category, pricePerDay } = body;
  if (!title || !category || typeof pricePerDay !== 'number') {
    return 'Неверные данные запроса. Поля title, category и числовое pricePerDay обязательны.';
  }
  return null;
}

function updateError(body) {
  const { title, category, pricePerDay, bookedDates } = body;
  if (!title || !category || typeof pricePerDay !== 'number' || !Array.isArray(bookedDates)) {
    return 'Неверные или неполные данные для обновления.';
  }
  if (body.deposit !== undefined && typeof body.deposit !== 'number') {
    return 'Поле deposit должно быть числом.';
  }
  return null;
}

async function list(req, res) {
  const items = await Item.findAll({ order: [['id', 'ASC']] });
  res.json(items);
}

async function getById(req, res) {
  const id = parseId(req.params.id);
  if (!id) {
    return res.status(400).json({ error: 'Некорректный идентификатор' });
  }

  const item = await Item.findByPk(id);
  if (!item) {
    return res.status(404).json({ error: `Вещь с ID ${id} не найдена` });
  }

  res.json(item);
}

async function create(req, res) {
  const error = createError(req.body);
  if (error) {
    return res.status(400).json({ error });
  }

  const item = await Item.create({
    title: req.body.title,
    category: req.body.category,
    pricePerDay: req.body.pricePerDay,
    bookedDates: req.body.bookedDates || [],
    deposit: req.body.deposit ?? 0,
  });

  res.status(201).json(item);
}

async function update(req, res) {
  const id = parseId(req.params.id);
  if (!id) {
    return res.status(400).json({ error: 'Некорректный идентификатор' });
  }

  const error = updateError(req.body);
  if (error) {
    return res.status(400).json({ error });
  }

  const payload = {
    title: req.body.title,
    category: req.body.category,
    pricePerDay: req.body.pricePerDay,
    bookedDates: req.body.bookedDates,
  };

  if (req.body.deposit !== undefined) {
    payload.deposit = req.body.deposit;
  }

  const [updated] = await Item.update(payload, { where: { id } });
  if (!updated) {
    return res.status(404).json({ error: `Вещь с ID ${id} не найдена` });
  }

  const item = await Item.findByPk(id);
  res.json(item);
}

async function remove(req, res) {
  const id = parseId(req.params.id);
  if (!id) {
    return res.status(400).json({ error: 'Некорректный идентификатор' });
  }

  const deleted = await Item.destroy({ where: { id } });
  if (!deleted) {
    return res.status(404).json({ error: `Вещь с ID ${id} не найдена` });
  }

  res.status(200).json({ message: `Вещь с ID ${id} успешно удалена` });
}

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
};
