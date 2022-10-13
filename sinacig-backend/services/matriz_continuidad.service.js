const sequelize = require('../libs/sequelize');
const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');
const { QueryTypes } = require('sequelize');

class MatrizcontinuidadService {
  constructor() {}

  async createMatrizcontinuidad(data) {
    const result = await models.MatrizContinuidad.create(data);
    return result.dataValues;
  }

  async getMatrizContinuidadByIdRiesgo(id_riesgo) {
    const result = await sequelize.query(
      `EXEC sp_get_riesgo_continuidad_by_id_riesgo
    @Id_riesgo = ${id_riesgo}`
    );
    if (result[0].length === 0) {
      throw boom.notFound('No hay registros');
    }
    return result[0];
  }

  async getMatrizContinuidadById(id_riesgo_continuidad) {
    const result = await models.MatrizContinuidad.findOne({
      raw: true,
      where: {
        estado_registro: 1,
        id_riesgo_continuidad,
      },
    });
    if (!result.id_riesgo_continuidad) {
      throw boom.notFound('No hay registros');
    }
    return result;
  }

  async updateMatrizContinuidad(changes, id_riesgo_continuidad) {
    const result = await models.MatrizContinuidad.update(changes, {
      raw: true,
      where: {
        id_riesgo_continuidad,
      },
    });
    return result;
  }

  async findExistenciaMatrizContinuidad(id_matriz) {
    const result = await sequelize.query(
      `EXEC sp_get_existencia_riesgo_continuidad
    @id_matriz = ${id_matriz}`,
      { type: QueryTypes.SELECT }
    );
    return result[0].Existencia;
  }
}

module.exports = MatrizcontinuidadService;
