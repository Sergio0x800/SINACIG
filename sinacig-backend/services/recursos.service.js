const sequelize = require('../libs/sequelize');
const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class RecursosService {
  constructor() {}

  async createRecurso(dataRecurso) {
    const result = await models.Recursos.create(dataRecurso);
    return result;
  }

  async findRecursosByIdRiesgo(id_riesgo) {
    const result = await sequelize.query(
      `EXEC sp_get_recursos_by_id_riesgo
    @id_riesgo = ${id_riesgo}`
    );
    if (result[0].length === 0) {
      throw boom.notFound('No hay registros');
    }
    return result[0];
  }

  async findRecursosByIdPlan(id_plan) {
    const result = await sequelize.query(
      `EXEC sp_get_recursos
    @Id_riesgo_plan_trabajo = ${id_plan}`
    );
    if (result[0].length === 0) {
      throw boom.notFound('No hay registros');
    }
    return result[0];
  }

  async deleteRecurso(id_recurso, changes) {
    const result = await models.Recursos.findOne({
      where: { id_recursos: id_recurso },
    });
    if (result.length === 0) {
      throw boom.notFound('No hay registros');
    }
    const resultUpdate = await models.Recursos.update(changes, {
      where: {
        id_recursos: id_recurso,
      },
    });
    return resultUpdate;
  }
}

module.exports = RecursosService;
