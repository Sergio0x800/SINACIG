const sequelize = require('../libs/sequelize');
const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class MatrizService {
  constructor() {}

  //Crear una matriz
  async createMatriz(dataRiesgo) {
    const result = await models.Matriz.create(dataRiesgo);
    return result;
  }

  //Encontrar matriz por parametros UE y Fecha
  async findMatrizByUnidadFecha(queryParams) {
    const result = await sequelize.query(
      `EXEC sp_get_matriz_by_params
      @Unidad_Ejecutora = ${queryParams.id_unidad_ejecutora},
      @FechaI = "${queryParams.fecha_periodo_inicio}",
      @FechaF = "${queryParams.fecha_periodo_fin}"`
    );
    if (result[0].length === 0) {
      throw boom.notFound('No hay registros');
    }
    return result[0];
  }

  //Encontrar la cantidad de encabezados matriz periodos abiertos
  async findMatrizPeriodoAbierto(queryParams) {
    const result = await models.Matriz.findAll({
      where: {
        periodo_abierto: 1,
        fecha_periodo_inicio: queryParams.fecha_inicio,
        fecha_periodo_fin: queryParams.fecha_fin,
        estado_registro: 1,
      },
    });
    return result.length;
  }

  //Encontrar matriz por id_matriz
  async findMatrizById(params) {
    const result = await sequelize.query(
      `EXEC sp_get_matriz_by_id
      @id_matriz = ${params.id_matriz}`
    );
    if (result[0].length === 0) {
      throw boom.notFound('No hay registros');
    }
    return result[0];
  }

  //Actualizar el encabezado matriz periodo
  async updateMatrizPeriodo(params, body) {
    const result = await models.Matriz.update(
      { periodo_abierto: body.estado },
      {
        where: {
          id_matriz: params.id_matriz,
        },
      }
    );
    return result;
  }

  //Eliminar el encabezado matriz periodo
  async deleteMatriz(params) {
    const result = await models.Matriz.update(
      { estado_registro: 0 },
      {
        where: {
          id_matriz: params.id_matriz,
        },
      }
    );
    return result;
  }
}

module.exports = MatrizService;
