import * as dotenv from 'dotenv';
dotenv.config();

module.exports = {
  database: {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    operatorAliases: false
  },
  auth: {
    secretKey: process.env.SECRET_KEY,
    session: false
  },
  port: process.env.PORT
};
