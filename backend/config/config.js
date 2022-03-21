module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DEV_DB_NAME,
    host: 'localhost',
    dialect: 'mysql',
  }
};
