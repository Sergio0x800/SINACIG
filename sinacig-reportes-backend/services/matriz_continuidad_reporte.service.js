const sequelize = require('../libs/sequelize');
const { models } = require('../libs/sequelize');

class MatrizContinuidadReporteService {
  constructor() {}

  async dataReporteMatrizContinuidad(
    cod_unidad_ejecutora,
    fechaInicio,
    fechaFin
  ) {
    try {
      const dataReporte = await sequelize.query(`
                EXEC sp_reporte_matriz_continuidad
                @ue = ${cod_unidad_ejecutora},
                @fecha_inicio = '${fechaInicio}',
                @fecha_fin = '${fechaFin}'
            `);
      return dataReporte;
    } catch (error) {
      throw `${error}`;
    }
  }

  async dataMetodosMonitoreo(id_riesgo_continuidad) {
    try {
      const dataMonitoreo = await models.Monitoreo.findAll({
        raw: true,
        where: {
          estado_registro: 1,
          id_riesgo_continuidad,
        },
      });
      return dataMonitoreo;
    } catch (error) {
      throw `${error}`;
    }
  }

  async totalRiesgosContinuidad(id_riesgo) {
    try {
      const result = await models.MatrizContinuidad.findAll({
        raw: true,
        where: {
          estado_registro: 1,
          id_riesgo,
        },
      });
      return result.length;
    } catch (error) {
      throw `${error}`;
    }
  }
}

module.exports = MatrizContinuidadReporteService;
