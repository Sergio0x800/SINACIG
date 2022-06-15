const sequelize = require('../libs/sequelize');
const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class MatrizService {
  constructor() {}

  async createMatriz(dataRiesgo) {
    try {
      const matrizAgregada = await models.Matriz.create(dataRiesgo);
      return matrizAgregada;
    } catch (error) {
      throw boom.internal('Error al ingresar el registro');
    }
  }

  async findMatrizById(id_matriz) {
    const dataMatrizPeriodos = await sequelize.query(
      `EXEC get_matriz_by_id
    @id_matriz = ${id_matriz}`
    );
    if (dataMatrizPeriodos[0].length === 0) {
      throw boom.notFound('No hay registros');
    }
    return dataMatrizPeriodos[0];
  }

  async findMatrizByIdForm(id_matriz) {
    const dataMatrizPeriodos = await sequelize.query(
      `EXEC get_matriz_by_id_form
    @id_matriz = ${id_matriz}`
    );
    if (dataMatrizPeriodos[0].length === 0) {
      throw boom.notFound('No hay registros');
    }
    return dataMatrizPeriodos[0];
  }

  async findMatrizByUnidadFecha(unidadE, fechaI, fechaF) {
    const dataMatrizPeriodos = await sequelize.query(
      `EXEC sp_get_matriz_by_params
    @Unidad_Ejecutora = ${unidadE},
    @FechaI = "${fechaI}",
    @FechaF = "${fechaF}"`
    );
    if (dataMatrizPeriodos[0].length === 0) {
      throw boom.notFound('No hay registros');
    }
    return dataMatrizPeriodos[0];
  }

  async deleteMatriz(id_matriz, changes) {
    const matrizEncontrada = await models.Matriz.findOne({
      where: { id_matriz: id_matriz },
    });
    if (matrizEncontrada.length === 0) {
      throw boom.notFound('No hay registros');
    }
    try {
      const updatedMatriz = await models.Matriz.update(changes, {
        where: {
          id_matriz: id_matriz,
        },
      });
      return updatedMatriz;
    } catch (error) {
      throw boom.internal('Error al actualizar el registro');
    }
  }

  async updateMatrizPeriodo(changes) {
    try {
      const updateMatriz = await models.Matriz.update(
        {
          periodo_abierto: 0,
        },
        {
          where: {
            fecha_periodo_inicio: changes.fecha_inicio,
            fecha_periodo_fin: changes.fecha_fin,
          },
        }
      );
      return updateMatriz;
    } catch (error) {
      throw `${error}`;
    }
  }
}

module.exports = MatrizService;
