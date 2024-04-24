const sequelize = require('../libs/sequelize');
const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');
const LogService = require('./logs.service');

const logService = new LogService();

class SeguimientoService {
  constructor() {}

  async getSeguimientos(id_riesgo) {
    const result = await sequelize.query(
      'EXEC sp_get_seguimientos_riesgo_by_id_riesgo @id_riesgo=:id_riesgo',
      {
        replacements: {
          id_riesgo: parseInt(id_riesgo),
        },
        type: sequelize.QueryTypes.RAW,
      }
    );
    return result[0];
  }
  async getArchivosSeguimientos(id_seguimiento_riesgo) {
    const result = await sequelize.query(
      'EXEC sp_get_archivos_seguimiento_by_id_seguimiento @id_seguimiento_riesgo=:id_seguimiento_riesgo',
      {
        replacements: {
          id_seguimiento_riesgo: parseInt(id_seguimiento_riesgo),
        },
        type: sequelize.QueryTypes.RAW,
      }
    );
    return result[0];
  }
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
  async updateSeguimiento(seguimiento) {
    const result = await sequelize.query(
      'EXEC sp_upd_seguimiento_riesgo @id_seguimiento_riesgo=:id_seguimiento_riesgo, @id_probabilidad=:id_probabilidad, @id_severidad=:id_severidad, @riesgo_inherente=:riesgo_inherente, @id_control_mitigador=:id_control_mitigador, @riesgo_residual=:riesgo_residual, @id_medida_riesgo=:id_medida_riesgo, @comentario_seguimiento=:comentario_seguimiento',
      {
        replacements: {
          id_seguimiento_riesgo: parseInt(seguimiento.id_seguimiento_riesgo),
          id_probabilidad: parseInt(seguimiento.id_probabilidad),
          id_severidad: parseInt(seguimiento.id_severidad),
          riesgo_inherente: parseInt(seguimiento.riesgo_inherente),
          id_control_mitigador: parseInt(seguimiento.id_control_mitigador),
          riesgo_residual: parseInt(seguimiento.riesgo_residual),
          id_medida_riesgo: parseInt(seguimiento.id_medida_riesgo),
          comentario_seguimiento: seguimiento.comentario_seguimiento.toString(),
        },
        type: sequelize.QueryTypes.RAW,
      }
    );

    return result;
  }
  async deleteSeguimiento(seguimiento) {
    const result = await sequelize.query(
      'EXEC sp_delete_seguimiento_riesgo @id_seguimiento_riesgo=:id_seguimiento_riesgo',
      {
        replacements: {
          id_seguimiento_riesgo: parseInt(seguimiento.id_seguimiento_riesgo),
        },
        type: sequelize.QueryTypes.RAW,
      }
    );

    return result;
  }
  async deleteSeguimientoArchivo(id_seguimiento_riesgo_archivo) {
    const result = await sequelize.query(
      'EXEC sp_delete_seguimiento_riesgo_archivo @id_seguimiento_riesgo_archivo=:id_seguimiento_riesgo_archivo',
      {
        replacements: {
          id_seguimiento_riesgo_archivo: parseInt(
            id_seguimiento_riesgo_archivo
          ),
        },
        type: sequelize.QueryTypes.RAW,
      }
    );

    return result;
  }
  async createSeguimientoArchivo(
    archivo,
    id_seguimiento_riesgo,
    id_usuario_registro
  ) {
    const ext = archivo.originalname.split('.');
    const nombreArchivo = archivo.originalname.split('|');
    const result = await sequelize.query(
      'EXEC sp_ins_seguimiento_riesgo_archivo  @id_seguimiento_riesgo=:id_seguimiento_riesgo, @ruta=:ruta, @nombre_archivo=:nombre_archivo, @tamano_archivo=:tamano_archivo, @tipo_archivo=:tipo_archivo, @comentario_archivo=:comentario_archivo, @id_usuario_registro=:id_usuario_registro',
      {
        replacements: {
          id_seguimiento_riesgo: parseInt(id_seguimiento_riesgo),
          ruta: archivo.destination + '/' + nombreArchivo[1],
          nombre_archivo: nombreArchivo[1],
          tamano_archivo: parseInt(archivo.size),
          tipo_archivo: ext[ext.length - 1],
          comentario_archivo: '',
          id_usuario_registro: parseInt(id_usuario_registro),
        },
        type: sequelize.QueryTypes.RAW,
      }
    );
    return result;
  }
}

module.exports = SeguimientoService;
