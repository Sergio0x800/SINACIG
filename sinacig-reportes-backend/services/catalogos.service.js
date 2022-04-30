const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');
const sequelize = require('../libs/sequelize');

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

  async findUnidadEjecutoraById(id_unidad_ejecutora){
    const dataUnidadEjecutora = await sequelize.query(
      `EXEC sp_get_unidad_ejecutora_by_id @id_unidad_ejecutora = ${id_unidad_ejecutora}`
    )
    if(dataUnidadEjecutora.length == 0){
      throw boom.notFound('No hay registros');
    }
    return dataUnidadEjecutora[0];
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

  // async findReferencia() {
  //   const dataReferencia = await models.Referencia.findAll({
  //     where: {
  //       estado_registro: 1,
  //     },
  //   });
  //   if (dataReferencia.length === 0) {
  //     throw boom.notFound('No hay registros');
  //   }
  //   return dataReferencia;
  // }

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
