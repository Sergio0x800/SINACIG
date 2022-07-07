const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class CatalogosService {
  constructor() {}

  async findUnidadEjecutoraById(id_unidad_ejecutora) {
    const dataUnidad = await models.Unidad.findOne({
      where: {
        id_unidad_ejecutora: parseInt(id_unidad_ejecutora),
        estado_registro: 1,
      },
    });
    if (!dataUnidad.id_unidad_ejecutora) {
      throw boom.notFound('No hay registros');
    }
    return dataUnidad;
  }
}

module.exports = CatalogosService;
