'use strict';

const app = require('./app');
const { port } = require('./config');
const { sequelize } = require('./models');

async function start() {
  try {
    await sequelize.authenticate();
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Не удалось подключиться к базе данных:', error.message);
    process.exit(1);
  }
}

start();
