const sequelize = require('../libs/sequelize');
const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class RecursosService {
  constructor() {}

  async createRecurso(dataRecurso) {
    try {
      const recursoAdded = await models.Recursos.create(dataRecurso);
      return recursoAdded;
    } catch (error) {
      throw `${error}`;
    }
  }

  async findRecursosByIdPlan(id_plan) {
    const recursos = await sequelize.query(
      `EXEC sp_get_recursos
    @Id_riesgo_plan_trabajo = ${id_plan}`
    );
    if (recursos[0].length === 0) {
      throw boom.notFound('No hay registros');
    }
    return recursos[0];
  }

  async deleteRecurso(id_recurso, changes) {
    const recurso = await models.Recursos.findOne({
      where: { id_recursos: id_recurso },
    });
    if (recurso.length === 0) {
      throw boom.notFound('No hay registros');
    }
    try {
      const updateRecurso = await models.Recursos.update(changes, {
        where: {
          id_recursos: id_recurso,
        },
      });
      return updateRecurso;
    } catch (error) {
      throw boom.internal('Error al actualizar el registro');
    }
  }
}

module.exports = RecursosService;
