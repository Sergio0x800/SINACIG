require('dotenv').config();
const config = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASS,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,

  dbUserOrc: process.env.DBORC_USER,
  dbPasswordOrc: process.env.DBORC_PASSWORD,
  dbOrcString: process.env.DBORC_ORC_STRING,
  dbOrcRouteClient: process.env.DBORC_ROUTE_CLIENT,
};

module.exports = config;
