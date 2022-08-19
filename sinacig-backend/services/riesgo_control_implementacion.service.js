const sequelize = require('../libs/sequelize');
const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class RiesgoControlImplementacionService {
  constructor() {}

  async createRiesgoControlImplementacion(data) {
    const result = await models.ControlImplementacion.create(data);
    return result;
  }

  async findRiesgoControlImplementacion(id_plan) {
    const result = await sequelize.query(`
      EXEC sp_get_control_implementacion
      @Id_riesgo_plan_trabajo = ${id_plan}`);
    if (result[0].length === 0) {
      throw boom.notFound('No hay registros');
    }
    return result[0];
  }

  async findRiesgoControlImplementacionByIdRiesgo(id_riesgo) {
    const result = await sequelize.query(`
      EXEC sp_get_control_implementacion_by_id_riesgo
      @id_riesgo = ${id_riesgo}`);
    if (result[0].length === 0) {
      throw boom.notFound('No hay registros');
    }
    return result[0];
  }

  async deletecontrolImplementacion(id_control, changes) {
    const result = await models.ControlImplementacion.findOne({
      where: { id_riesgo_plan_control_implementacion: id_control },
    });
    if (result.length === 0) {
      throw boom.notFound('No hay registros');
    }
    const resultUpdate = await models.ControlImplementacion.update(changes, {
      where: {
        id_riesgo_plan_control_implementacion: id_control,
      },
    });
    return resultUpdate;
  }
}

module.exports = RiesgoControlImplementacionService;
