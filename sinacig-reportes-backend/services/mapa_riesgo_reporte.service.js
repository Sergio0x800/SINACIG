const sequelize = require('../libs/sequelize');

class MapaRiesgo {
  constructor() {}

  async dataReporteMapariesgo(cod_unidad_ejecutora, fechaInicio, fechaFin) {
    try {
      const dataReporte = await sequelize.query(`
            execute sp_rpt_mapa_riesgo
                @ue = ${cod_unidad_ejecutora},
                @fecha_inicio = '${fechaInicio}',
                @fecha_fin = '${fechaFin}'
            `);
      return dataReporte[0];
    } catch (error) {
      console.log('mensaje::', error.message);
      throw `${error}`;
    }
  }
}

module.exports = MapaRiesgo;
