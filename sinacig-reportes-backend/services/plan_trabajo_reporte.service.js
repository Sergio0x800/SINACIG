const sequelize = require('../libs/sequelize');

class PlanTrabajoReporteService {
  constructor() {}

  async dataReportePlanTrabajo(cod_unidad_ejecutora, fechaInicio, fechaFin) {
    try {
      const dataReporte = await sequelize.query(`
                EXEC sp_reporte_plan_trabajo
                @ue = ${cod_unidad_ejecutora},
                @fecha_inicio = '${fechaInicio}',
                @fecha_fin = '${fechaFin}'
            `);

      return dataReporte;
    } catch (error) {
      throw `${error}`;
    }
  }
}

module.exports = PlanTrabajoReporteService;
