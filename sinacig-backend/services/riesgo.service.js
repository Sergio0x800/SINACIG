const sequelize = require('../libs/sequelize');
const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class RiesgoService {
  constructor() {}

  async createRiesgo(dataRiesgo) {
    const result = await models.Riesgo.create(dataRiesgo);
    return result;
  }

  async findRiesgoToEdit(id_riesgo) {
    const result = await models.Riesgo.findByPk(id_riesgo);
    if (result.length === 0) {
      throw boom.notFound('No hay registros');
    }
    return result;
  }

  async findRiesgoByIdMatrizUpdateRef() {
    const result = await sequelize.query(`EXEC sp_get_riesgo_periodoCerrado`);
    if (result[0].length === 0) {
      throw boom.notFound('No hay registros');
    }
    return result[0];
  }

  async findRiesgoById(id_riesgo) {
    const result = await sequelize.query(
      `EXEC sp_get_riesgos_by_id_riesgo
    @id_riesgo = ${id_riesgo}`
    );
    if (result[0].length === 0) {
      throw boom.notFound('No hay registros');
    }
    return result[0];
  }

  async findRiesgoByIdMatriz(id_matriz, offset) {
    const result = await sequelize.query(
      `EXEC sp_get_riesgos_by_id_matriz
    @id_matriz = ${id_matriz},
    @next = ${offset}`
    );
    if (result[0].length === 0) {
      return {
        existencia: 0,
      };
      // throw boom.notFound('No hay registros');
    }
    return {
      existencia: 1,
      res: result[0],
    };
    // result[0];
  }

  async deleteRiesgo(id_matriz, changes) {
    const result = await models.Riesgo.update(changes, {
      where: {
        id_matriz: id_matriz,
      },
    });
    return result;
  }

  async updateRiesgo(id_riesgo, changes) {
    const riesgoAntes = await models.Riesgo.findOne({
      where: { id_riesgo: id_riesgo },
    });
    const riesgoEncontrado = await models.Riesgo.findOne({
      where: { id_riesgo: id_riesgo },
    });
    if (riesgoEncontrado.length === 0) {
      throw boom.notFound('No hay registros');
    }
    try {
      const updatedRiesgo = await riesgoEncontrado.update(changes, {
        where: {
          id_riesgo: id_riesgo,
        },
      });
      return {
        tabla: 'tt_riesgo',
        id_registro: updatedRiesgo.id_riesgo,
        antes: riesgoAntes,
        despues: updatedRiesgo,
      };
    } catch (error) {
      throw boom.internal('Error al actualizar el registro');
    }
  }
}

module.exports = RiesgoService;
