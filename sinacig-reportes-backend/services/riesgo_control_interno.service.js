const sequelize = require('../libs/sequelize');
const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class RiesgoControlInternoService {
  constructor() {}

  async createRiesgoControlInterno(dataRiesgoControlInterno) {
    try {
      const controlInterno = await models.ControlInterno.create(
        dataRiesgoControlInterno
      );
      return controlInterno;
    } catch (error) {
      throw `${error}`;
    }
  }

  async findRiesgoControlInterno(id_plan) {
    const controlInterno = await sequelize.query(`
      EXEC sp_get_control_interno
      @Id_riesgo_plan_trabajo = ${id_plan}`);
    if (controlInterno[0].length === 0) {
      throw boom.notFound('No hay registros');
    }
    return controlInterno[0];
  }

  async deleteControlInterno(id_control, changes) {
    const control = await models.ControlInterno.findOne({
      where: { id_riesgo_control_interno: id_control },
    });
    if (control.length === 0) {
      throw boom.notFound('No hay registros');
    }
    try {
      const updateControl = await models.ControlInterno.update(changes, {
        where: {
          id_riesgo_control_interno: id_control,
        },
      });
      return updateControl;
    } catch (error) {
      throw boom.internal('Error al actualizar el registro');
    }
  }
}

module.exports = RiesgoControlInternoService;
