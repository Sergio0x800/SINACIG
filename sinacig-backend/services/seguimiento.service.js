const sequelize = require('../libs/sequelize');
const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');
const LogService = require('./logs.service');

const logService = new LogService();

class SeguimientoService {
  constructor() {}

  async createSeguimiento(seguimiento) {
    const result = await sequelize.query(
      'EXEC sp_ins_seguimiento_riesgo @id_riesgo=:id_riesgo, @id_probabilidad=:id_probabilidad, @id_severidad=:id_severidad, @riesgo_inherente=:riesgo_inherente, @id_control_mitigador=:id_control_mitigador, @riesgo_residual=:riesgo_residual, @id_medida_riesgo=:id_medida_riesgo, @comentario_seguimiento=:comentario_seguimiento, @id_usuario_registro=:id_usuario_registro',
      {
        replacements: {
          id_riesgo: parseInt(seguimiento.id_riesgo),
          id_probabilidad: parseInt(seguimiento.id_probabilidad),
          id_severidad: parseInt(seguimiento.id_severidad),
          riesgo_inherente: parseInt(seguimiento.riesgo_inherente),
          id_control_mitigador: parseInt(seguimiento.id_control_mitigador),
          riesgo_residual: parseInt(seguimiento.riesgo_residual),
          id_medida_riesgo: parseInt(seguimiento.id_medida_riesgo),
          comentario_seguimiento: seguimiento.comentario_seguimiento.toString(),
          id_usuario_registro: parseInt(seguimiento.id_usuario_registro),
        },
        type: sequelize.QueryTypes.RAW,
      }
    );

    return result;
  }
}

module.exports = SeguimientoService;
