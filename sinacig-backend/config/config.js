require('dotenv').config();
const config = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASS,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  jwtSecret: process.env.JWT_SECRET,
  jwtSecretRef: process.env.JWT_SECRET_REF,
};

module.exports = config;
