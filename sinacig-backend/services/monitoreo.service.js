// const sequelize = require('../libs/sequelize');
const { models } = require('../libs/sequelize');
// const boom = require('@hapi/boom');

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
    const result = await models.Monitoreo.update(changes, {
      where: {
        id_detalle_monitoreo,
      },
    });
    return result;
  }
}

module.exports = MonitoreoService;
