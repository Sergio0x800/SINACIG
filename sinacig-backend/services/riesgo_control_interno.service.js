const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class RiesgoControlInternoService {
  constructor() {}

  async createRiesgoControlInterno(dataRiesgoControlInterno) {
    const result = await models.ControlInterno.create(dataRiesgoControlInterno);
    return result;
  }

  async findRiesgoControlInterno(id_plan) {
    const result = await models.ControlInterno.findAll({
      where: {
        id_riesgo: id_plan,
        estado_registro: 1,
      },
    });
    if (result.length === 0) {
      throw boom.notFound('No hay registros');
    }
    return result;
  }

  async deleteControlInterno(id_control, changes) {
    const result = await models.ControlInterno.findOne({
      where: { id_riesgo_control_interno: id_control },
    });
    if (result.length === 0) {
      throw boom.notFound('No hay registros');
    }
    const resultUpdate = await models.ControlInterno.update(changes, {
      where: {
        id_riesgo_control_interno: id_control,
      },
    });
    return resultUpdate;
  }
}

module.exports = RiesgoControlInternoService;
