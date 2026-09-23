'use strict';

function notFound(req, res) {
  res.status(404).json({ error: 'Маршрут не найден' });
}

module.exports = notFound;
