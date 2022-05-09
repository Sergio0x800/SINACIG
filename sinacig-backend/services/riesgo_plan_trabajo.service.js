const sequelize = require('../libs/sequelize');
const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class RiesgoPlanTrabajoService {
  constructor() {}

  async createRiesgoPlanTrabajo(dataRiesgoPlanTrabajo) {
    try {
      const riesgoPlanTrabajoAdded = await models.PlanTrabajo.create(
        dataRiesgoPlanTrabajo
      );
      return riesgoPlanTrabajoAdded.dataValues;
    } catch (error) {
      throw `${error}`;
    }
  }

  async findPlanTrabajoByIdRiesgo(id_riesgo) {
    const dataPlanes = await sequelize.query(
      `EXEC sp_get_planes_trabajo_by_riesgo
    @Id_riesgo = ${id_riesgo}`
    );
    if (dataPlanes[0].length === 0) {
      throw boom.notFound('No hay registros');
    }
    return dataPlanes[0];
  }

  async findExistenciaPlanTrabajo(id_matriz) {
    const result = await sequelize.query(
      `EXEC sp_get_existencia_plan
    @id_matriz = ${id_matriz}`
    );
    if (result[0].length === 0) {
      throw boom.notFound('No hay registros');
    }
    return result[0];
  }

  async findPlanTrabajoByIdSP(id_plan) {
    const dataPlanes = await sequelize.query(
      `EXEC sp_get_planes_trabajo_by_id
    @Id_riesgo = ${id_plan}`
    );
    if (dataPlanes[0].length === 0) {
      throw boom.notFound('No hay registros');
    }
    return dataPlanes[0];
  }

  async findPlanTrabajoByIdD(id_plan) {
    const dataPlanes = await models.PlanTrabajo.findByPk(id_plan);
    if (dataPlanes.length === 0) {
      throw boom.notFound('No hay registros');
    }
    return dataPlanes;
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

  // async RiesgoPlanTrabajo(unidad, fechaI, fechaF) {
  //   const dataRiesgosEncontrados = await sequelize.query(
  //     `EXEC sp_get_riesgos_by_fecha
  //   @Unidad_Ejecutora = ${unidad},
  //   @FechaI = "${fechaI}",
  //   @FechaF = "${fechaF}"`
  //   );
  //   if (dataRiesgosEncontrados[0].length === 0) {
  //     throw boom.notFound('No hay registros');
  //   }
  //   return dataRiesgosEncontrados[0];
  // }
}

module.exports = RiesgoPlanTrabajoService;
