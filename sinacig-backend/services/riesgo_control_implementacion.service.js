const sequelize = require('../libs/sequelize');
const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class RiesgoControlImplementacionService {
  constructor() {}

  async createRiesgoControlImplementacion(data) {
    try {
      const implementacion = await models.ControlImplementacion.create(data);
      return implementacion;
    } catch (error) {
      throw boom.internal('Error en el servidor');
    }
  }

  async findRiesgoControlImplementacion(id_plan) {
    const controlImplementacion = await sequelize.query(`
      EXEC sp_get_control_implementacion
      @Id_riesgo_plan_trabajo = ${id_plan}`);
    if (controlImplementacion[0].length === 0) {
      throw boom.notFound('No hay registros');
    }
    return controlImplementacion[0];
  }

  async findRiesgoControlImplementacionByIdRiesgo(id_riesgo) {
    const controlImplementacion = await sequelize.query(`
      EXEC sp_get_control_implementacion_by_id_riesgo
      @id_riesgo = ${id_riesgo}`);
    if (controlImplementacion[0].length === 0) {
      throw boom.notFound('No hay registros');
    }
    return controlImplementacion[0];
  }

  async deletecontrolImplementacion(id_control, changes) {
    const control = await models.ControlImplementacion.findOne({
      where: { id_riesgo_plan_control_implementacion: id_control },
    });
    if (control.length === 0) {
      throw boom.notFound('No hay registros');
    }
    try {
      const updateControl = await models.ControlImplementacion.update(changes, {
        where: {
          id_riesgo_plan_control_implementacion: id_control,
        },
      });
      return updateControl;
    } catch (error) {
      throw boom.internal('Error al actualizar el registro');
    }
  }
}

module.exports = RiesgoControlImplementacionService;
