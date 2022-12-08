const sequelize = require('../libs/sequelize');
const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');
const LogService = require('./logs.service');

const logService = new LogService();

class ControlInternoPlanService {
  constructor() {}

  async createControlInternoPlan(dataControl) {
    const result = await models.ControlInternoPlan.create(dataControl);
    return result;
  }

  async findControlInternoPlanByIdRiesgo(id_riesgo) {
    const result = await sequelize.query(
      `EXEC sp_get_controlIntrernoPlan_by_id_riesgo
      @id_riesgo = ${id_riesgo}`
    );
    if (result[0].length === 0) {
      throw boom.notFound('No hay registros');
    }
    return result[0];
  }

  async deleteControlInternoPlan(id_plan_control_interno, changes) {
    const resultAntes = await models.ControlInternoPlan.findOne({
      where: {
        id_plan_control_interno: id_plan_control_interno,
      },
    });
    const resultDespues = await models.ControlInternoPlan.findOne({
      where: {
        id_plan_control_interno: id_plan_control_interno,
      },
    });
    const result = await resultDespues.update(changes, {
      where: {
        id_plan_control_interno: id_plan_control_interno,
      },
    });
    const newLog = {
      nombre_tabla: 'tt_plan_control_interno',
      id_registro: id_plan_control_interno,
      antes: JSON.stringify(resultAntes),
      despues: JSON.stringify(result),
      id_usuario_modifico: changes.usuario_registro,
    };
    await logService.createLog(newLog);
    return result;
  }
}

module.exports = ControlInternoPlanService;
