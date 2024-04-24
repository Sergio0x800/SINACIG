// const sequelize = require('../libs/sequelize');
const { models } = require('../libs/sequelize');
// const boom = require('@hapi/boom');
const LogService = require('./logs.service');

const logService = new LogService();

class MonitoreoService {
  constructor() {}

  async createMetodoMonitoreo(data) {
    const result = await models.Monitoreo.create(data);
    return result.dataValues;
  }

  async getMetodoMonitoreoByIdRiesgoContinuidad(id_riesgo_continuidad) {
    const result = await models.Monitoreo.findAll({
      raw: true,
      where: {
        estado_registro: 1,
        id_riesgo_continuidad,
      },
    });
    return result;
  }

  async deleteLogicoMetodoMonitoreo(changes, id_detalle_monitoreo) {
    const resultAntes = await models.Monitoreo.findOne({
      where: {
        id_detalle_monitoreo,
      },
    });
    const resultDespues = await models.Monitoreo.findOne({
      where: {
        id_detalle_monitoreo,
      },
    });
    const result = await resultDespues.update(changes, {
      where: {
        id_detalle_monitoreo,
      },
    });
    const newLog = {
      nombre_tabla: 'tt_detalle_monitoreo',
      id_registro: id_detalle_monitoreo,
      antes: JSON.stringify(resultAntes),
      despues: JSON.stringify(result),
      id_usuario_modifico: changes.usuario_registro,
    };
    await logService.createLog(newLog);
    return result;
  }
}

module.exports = MonitoreoService;
