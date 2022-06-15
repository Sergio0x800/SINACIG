const { models } = require('../libs/sequelize');
const sequelize = require('../libs/sequelize');
const boom = require('@hapi/boom');

class CatalogosService {
  constructor() {}

  async findUnidadEjecutora() {
    const dataUnidad = await models.Unidad.findAll({
      where: {
        estado_registro: 1,
      },
    });
    if (dataUnidad.length === 0) {
      throw boom.notFound('No hay registros');
    }
    return dataUnidad;
  }

  async findUnidadEjecutoraByCodigo(id_unidad) {
    const dataUnidad = await models.Unidad.findOne({
      where: {
        id_unidad_ejecutora: id_unidad,
        estado_registro: 1,
      },
    });
    if (dataUnidad.length === 0) {
      throw boom.notFound('No hay registros');
    }
    return [dataUnidad];
  }

  async findRoles() {
    const dataRoles = await models.Rol.findAll({
      where: {
        estado_registro: 1,
      },
    });
    if (dataRoles.length === 0) {
      throw boom.notFound('No hay registros');
    }
    return dataRoles;
  }

  async findControlMitigador() {
    const dataControl = await models.ControlMitigador.findAll({
      where: {
        estado_registro: 1,
      },
    });
    if (dataControl.length === 0) {
      throw boom.notFound('No hay registros');
    }
    return dataControl;
  }

  async findTipoObjetivo() {
    const dataTipoObjetivos = await models.TipoObjetivo.findAll({
      where: {
        estado_registro: 1,
      },
    });
    if (dataTipoObjetivos.length === 0) {
      throw boom.notFound('No hay registros');
    }
    return dataTipoObjetivos;
  }

  async findSeveridad() {
    const dataSeveridad = await models.Severidad.findAll({
      where: {
        estado_registro: 1,
      },
    });
    if (dataSeveridad.length === 0) {
      throw boom.notFound('No hay registros');
    }
    return dataSeveridad;
  }

  async findPeriodos() {
    const periodos = await sequelize.query(`EXEC sp_get_periodos`);
    if (periodos[0].length === 0) {
      throw boom.notFound('No hay registros');
    }
    return periodos[0];
  }

  async cerrarPeriodo(id_periodo, changes) {
    const periodos = await models.Periodos.update(changes, {
      where: {
        id_periodo: id_periodo,
      },
    });

    const periodo = await models.Periodos.findOne({
      where: {
        id_periodo: id_periodo,
      },
    });
    return periodo;
  }

  async findAreaEvaluada() {
    const dataAreaEvaluada = await models.AreaEvaluada.findAll({
      where: {
        estado_registro: 1,
      },
    });
    if (dataAreaEvaluada.length === 0) {
      throw boom.notFound('No hay registros');
    }
    return dataAreaEvaluada;
  }

  async findEventos() {
    const dataEventos = await models.Eventos.findAll({
      where: {
        estado_registro: 1,
      },
    });
    if (dataEventos.length === 0) {
      throw boom.notFound('No hay registros');
    }
    return dataEventos;
  }

  async findProbabilidad() {
    const dataProbabilidad = await models.Probabilidad.findAll({
      where: {
        estado_registro: 1,
      },
    });
    if (dataProbabilidad.length === 0) {
      throw boom.notFound('No hay registros');
    }
    return dataProbabilidad;
  }

  async findMedidaRiesgo() {
    const dataMedidaRiesgo = await models.Medida.findAll({
      where: {
        estado_registro: 1,
      },
    });
    if (dataMedidaRiesgo.length === 0) {
      throw boom.notFound('No hay registros');
    }
    return dataMedidaRiesgo;
  }

  async findPrioridad() {
    const dataPrioridad = await models.Prioridad.findAll({
      where: {
        estado_registro: 1,
      },
    });
    if (dataPrioridad.length === 0) {
      throw boom.notFound('No hay registros');
    }
    return dataPrioridad;
  }

  async findPuestoResponsable() {
    const dataPuestoResponsable = await models.PuestoResponsable.findAll({
      where: {
        estado_registro: 1,
      },
    });
    if (dataPuestoResponsable.length === 0) {
      throw boom.notFound('No hay registros');
    }
    return dataPuestoResponsable;
  }
}

module.exports = CatalogosService;
