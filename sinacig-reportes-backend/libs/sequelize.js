const config = require('../config/config');
const { Sequelize } = require('sequelize');
const setupModels = require('../db/models/index.model');
const sequelize = new Sequelize(
  config.dbName,
  config.dbUser,
  config.dbPassword,
  {
    host: config.dbHost,
    dialect: 'mssql',
    logging: true, // aca se puede cambiar los mensajes por consola de sequelize
  }
);



sequelize
  .authenticate()
  .then(() => {
    console.log('\nLa conexion con la DB principal fue establecida');
  })
  .catch((error) => {
    console.log(
      '\nHa ocurrido un error en la conexión con la DB principal: ' + error
    );
  });

setupModels(sequelize);
//sequelize.sync()- Esto crea la tabla si no existe (y no hace nada si ya existe)
//sequelize.sync({ force: true })- Esto crea la tabla, soltándola primero si ya existía
//sequelize.sync({ alter: true })- Esto verifica cuál es el estado actual de la tabla en la base de datos (qué columnas tiene, cuáles son sus tipos de datos, etc.), y luego realiza los cambios necesarios en la tabla para que coincida con el modelo.

module.exports = sequelize;
