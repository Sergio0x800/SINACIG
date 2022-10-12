const sequelize = require('../libs/sequelize');
const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');
const { QueryTypes } = require('sequelize');

class RiesgoPlanTrabajoService {
  constructor() {}

  async createRiesgoPlanTrabajo(dataRiesgoPlanTrabajo) {
    const result = await models.PlanTrabajo.create(dataRiesgoPlanTrabajo);
    return result.dataValues;
  }

  async findExistenciaPlanTrabajo(id_matriz) {
    const result = await sequelize.query(
      `EXEC sp_get_existencia_plan
    @id_matriz = ${id_matriz}`,
      { type: QueryTypes.SELECT }
    );
    return result[0].Existencia;
  }

  async findPlanTrabajoByIdD(id_plan) {
    const result = await models.PlanTrabajo.findByPk(id_plan);
    if (result.length === 0) {
      throw boom.notFound('No hay registros');
    }
    return result;
  }

  async findPlanTrabajoByIdRiesgo(id_riesgo) {
    const result = await sequelize.query(
      `EXEC sp_get_planes_trabajo_by_riesgo
    @Id_riesgo = ${id_riesgo}`
    );
    if (result[0].length === 0) {
      throw boom.notFound('No hay registros');
    }
    return result[0];
  }

  async findPlanTrabajoByIdSP(id_plan) {
    const result = await sequelize.query(
      `EXEC sp_get_planes_trabajo_by_id
    @Id_riesgo = ${id_plan}`
    );
    if (result[0].length === 0) {
      throw boom.notFound('No hay registros');
    }
    return result[0];
  }

  async updatePlan(id_plan, changes) {
    const planAntes = await models.PlanTrabajo.findOne({
      where: { id_riesgo_plan_trabajo: id_plan },
    });
    const planEncontrado = await models.PlanTrabajo.findOne({
      where: { id_riesgo_plan_trabajo: id_plan },
    });
    if (planEncontrado.length === 0) {
      throw boom.notFound('No hay registros');
    }
    try {
      const updatedPlan = await planEncontrado.update(changes, {
        where: {
          id_riesgo_plan_trabajo: id_plan,
        },
      });
      return {
        tabla: 'tt_riesgo_plan_trabajo',
        id_registro: updatedPlan.id_riesgo_plan_trabajo,
        antes: planAntes,
        despues: updatedPlan,
      };
    } catch (error) {
      throw boom.internal('Error al actualizar el registro');
    }
  }

  async deletePlanTrabajoByIdRiesgo(id_riesgo, changes) {
    try {
      const result = await models.PlanTrabajo.update(changes, {
        where: {
          id_riesgo: id_riesgo,
        },
      });
      return result;
    } catch (error) {
      throw boom.internal('Error al actualizar el registro');
    }
  }
}

module.exports = RiesgoPlanTrabajoService;
