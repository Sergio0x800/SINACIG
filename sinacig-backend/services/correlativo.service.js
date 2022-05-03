// const sequelize = require('../libs/sequelize');
const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class CorrelativoService {
  constructor() {}

  async createCorrelativo(dataCorrelativo) {
    try {
      const correlativoAdded = await models.Correlativo.create(dataCorrelativo);
      return correlativoAdded;
    } catch (error) {
      throw `${error}`;
    }
  }

  async findCorrelativo(id_tipo_objetivo) {
    try {
      const correlativoMaximo = await models.Correlativo.findOne({
        where: {
          // id_matriz: id_matriz,
          id_tipo_objetivo: id_tipo_objetivo,
          estado_registro: 1,
        },
      });
      return correlativoMaximo;
    } catch (error) {
      return error;
    }
    // if (correlativoMaximo.length === 0) {
    //   throw boom.notFound('No hay registros');
    // }
    // return correlativoMaximo;
  }

  async deleteCorrelativo(id_correlativo_maximo, changes) {
    // console.log(id_correlativo_maximo);
    const correlativoEncontrado = await models.Correlativo.findOne({
      where: {
        id_correlativo_maximo: id_correlativo_maximo,
      },
    });
    if (correlativoEncontrado.length === 0) {
      throw boom.notFound('No hay registros');
    }
    try {
      const correlativoDeleted = await models.Correlativo.update(changes, {
        where: {
          id_correlativo_maximo: id_correlativo_maximo,
        },
      });
      return correlativoDeleted;
    } catch (error) {
      throw boom.internal('Error al actualizar el registro');
    }
  }

  // async findRiesgosByUnidadFecha(unidad, fechaI, fechaF) {
  //   const dataRiesgosEncontrados = await sequelize.query(
  //     `EXEC sp_get_riesgos_by_fecha
  //   @Unidad_Ejecutora = ${unidad},
  //   @FechaI = "${fechaI}",
  //   @FechaF = "${fechaF}"`
  //   );

  //   if (dataRiesgosEncontrados[0].length === 0) {
  //     throw boom.notFound('No hay registros');
  //   }
  //   return dataRiesgosEncontrados[0];
  // }

  // async findRiesgoByIdSp(id_riesgo) {
  //   const dataRiesgosEncontrados = await sequelize.query(
  //     `EXEC sp_get_riesgos_by_id
  //   @id_riesgo = ${id_riesgo}`
  //   );
  //   if (dataRiesgosEncontrados[0].length === 0) {
  //     throw boom.notFound('No hay registros');
  //   }
  //   return dataRiesgosEncontrados[0];
  // }

  // async findRiesgoById(id_riesgo) {
  //   const riesgo = await models.Riesgo.findByPk(id_riesgo);
  //   if (riesgo.length === 0) {
  //     throw boom.notFound('No se encontro el registro solicitado');
  //   }
  //   return riesgo;
  // }

  // async updateRiesgo(id_riesgo, changes) {
  //   const riesgoEncontrado = await models.Riesgo.findOne({
  //     where: { id_riesgo: id_riesgo },
  //   });
  //   if (riesgoEncontrado.length === 0) {
  //     throw boom.notFound('No hay registros');
  //   }
  //   try {
  //     const updatedRiesgo = await models.Riesgo.update(changes, {
  //       where: {
  //         id_riesgo: id_riesgo,
  //       },
  //     });
  //     return updatedRiesgo;
  //   } catch (error) {
  //     throw boom.internal('Error al actualizar el registro');
  //   }
  // }
}

module.exports = CorrelativoService;
