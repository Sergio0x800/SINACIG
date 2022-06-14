const sequelize = require('../libs/sequelize');
const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class ControlInternoPlanService {
  constructor() {}

  async createControlInternoPlan(dataControl) {
    try {
      const result = await models.ControlInternoPlan.create(dataControl);
      return result;
    } catch (error) {
      throw `${error}`;
    }
  }

  async findControlInternoPlanByIdRiesgo(id_riesgo) {
    try {
      const result = await sequelize.query(
        `EXEC sp_get_controlIntrernoPlan_by_id_riesgo
      @id_riesgo = ${id_riesgo}`
      );
      return result[0];
    } catch (error) {
      throw `${error}`;
    }
  }

  // async findRecursosByIdPlan(id_plan) {
  //   const recursos = await sequelize.query(
  //     `EXEC sp_get_recursos
  //   @Id_riesgo_plan_trabajo = ${id_plan}`
  //   );
  //   if (recursos[0].length === 0) {
  //     throw boom.notFound('No hay registros');
  //   }
  //   return recursos[0];
  // }

  async deleteControlInternoPlan(id_plan_control_interno, changes) {
    try {
      const result = await models.ControlInternoPlan.update(changes, {
        where: {
          id_plan_control_interno: id_plan_control_interno,
        },
      });
      return result;
    } catch (error) {
      throw boom.internal('Error al actualizar el registro');
    }
  }
}

module.exports = ControlInternoPlanService;
