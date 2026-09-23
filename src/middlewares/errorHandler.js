'use strict';

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  console.error(err);

  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({ error: 'Запись с такими данными уже существует' });
  }

  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      error: err.errors.map((item) => item.message).join('; '),
    });
  }

  res.status(500).json({ error: 'Что-то пошло не так на сервере!' });
}

module.exports = errorHandler;
