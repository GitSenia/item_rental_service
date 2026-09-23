const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const shared = {
  use_env_variable: 'DATABASE_URL',
  dialect: 'postgres',
};

module.exports = {
  development: {
    ...shared,
    logging: false,
  },
  test: {
    ...shared,
    logging: false,
  },
  production: {
    ...shared,
    logging: false,
    dialectOptions: process.env.DB_SSL === 'true'
      ? { ssl: { require: true, rejectUnauthorized: false } }
      : {},
  },
};
