const { models } = require('../libs/sequelize');
// const boom = require('@hapi/boom');

class LogService {
  constructor() {}

  async createLog(data) {
    const newLog = {
      nombre_tabla: data.tabla,
      id_registro: data.id_registro,
      antes: JSON.stringify(data.antes),
      despues: JSON.stringify(data.despues),
      id_usuario_modifico: data.despues.usuario_registro,
    };
    try {
      const result = await models.Log.create(newLog);
      return result;
    } catch (error) {
      throw `${error}`;
    }
  }
}

module.exports = LogService;
