const sequelize = require('../libs/sequelize');
const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');
const LogService = require('./logs.service');

const logService = new LogService();

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
    const resultAntes = await models.Recursos.findOne({
      where: { id_recursos: id_recurso },
    });
    const resultDespues = await models.Recursos.findOne({
      where: { id_recursos: id_recurso },
    });
    if (resultAntes.length === 0) {
      throw boom.notFound('No hay registros');
    }
    const resultUpdate = await resultDespues.update(changes, {
      where: {
        id_recursos: id_recurso,
      },
    });
    const newLog = {
      nombre_tabla: 'tt_recursos',
      id_registro: id_recurso,
      antes: JSON.stringify(resultAntes),
      despues: JSON.stringify(resultUpdate),
      id_usuario_modifico: changes.usuario_registro,
    };
    await logService.createLog(newLog);
    return resultUpdate;
  }
}

module.exports = RecursosService;
