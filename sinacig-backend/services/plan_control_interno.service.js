const sequelize = require('../libs/sequelize');
const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

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
    const result = await models.ControlInternoPlan.update(changes, {
      where: {
        id_plan_control_interno: id_plan_control_interno,
      },
    });
    return result;
  }
}

module.exports = ControlInternoPlanService;
