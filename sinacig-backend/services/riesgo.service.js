const sequelize = require('../libs/sequelize');
const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class RiesgoService {
  constructor() {}

  async createRiesgo(dataRiesgo) {
    try {
      const riesgoAgregado = await models.Riesgo.create(dataRiesgo);
      return riesgoAgregado;
    } catch (error) {
      throw `${error}`;
    }
  }

  // async findRiesgos() {
  //   const dataRiesgos = await sequelize.query(`EXEC sp_get_all_riesgos`);
  //   if (dataRiesgos.length === 0) {
  //     throw boom.notFound('No hay registros');
  //   }
  //   return dataRiesgos;
  // }

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

  async findRiesgoById(id_riesgo) {
    const dataRiesgosEncontrados = await sequelize.query(
      `EXEC sp_get_riesgos_by_id_riesgo
    @id_riesgo = ${id_riesgo}`
    );
    if (dataRiesgosEncontrados[0].length === 0) {
      throw boom.notFound('No hay registros');
    }
    return dataRiesgosEncontrados[0];
  }

  async findRiesgoByIdMatriz(id_matriz) {
    const dataRiesgosEncontrados = await sequelize.query(
      `EXEC sp_get_riesgos_by_id_matriz
    @id_matriz = ${id_matriz}`
    );
    if (dataRiesgosEncontrados[0].length === 0) {
      throw boom.notFound('No hay registros');
    }
    return dataRiesgosEncontrados[0];
  }

  async findRiesgoToEdit(id_riesgo) {
    const riesgo = await models.Riesgo.findByPk(id_riesgo);
    if (riesgo.length === 0) {
      throw boom.notFound('No se encontro el registro solicitado');
    }
    return riesgo;
  }

  async deleteRiesgo(id_riesgo, changes) {
    const riesgoEncontrado = await models.Riesgo.findOne({
      where: { id_riesgo: id_riesgo },
    });
    if (riesgoEncontrado.length === 0) {
      throw boom.notFound('No hay registros');
    }
    try {
      const updatedRiesgo = await models.Riesgo.update(changes, {
        where: {
          id_riesgo: id_riesgo,
        },
      });
      return updatedRiesgo;
    } catch (error) {
      console.log(error);
      throw boom.internal('Error al actualizar el registro');
    }
  }
  async updateRiesgo(id_riesgo, changes) {
    const riesgoEncontrado = await models.Riesgo.findOne({
      where: { id_riesgo: id_riesgo },
    });
    if (riesgoEncontrado.length === 0) {
      throw boom.notFound('No hay registros');
    }
    try {
      const updatedRiesgo = await models.Riesgo.update(changes, {
        where: {
          id_riesgo: id_riesgo,
        },
      });
      return updatedRiesgo;
    } catch (error) {
      throw boom.internal('Error al actualizar el registro');
    }
  }
}

module.exports = RiesgoService;
