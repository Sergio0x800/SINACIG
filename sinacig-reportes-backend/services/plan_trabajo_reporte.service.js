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

  async dataRecursos(id_plan) {
    try {
      const planeRecursos = await sequelize.query(
        `EXEC sp_get_recursos
      @Id_riesgo_plan_trabajo = ${id_plan}`
      );
      return planeRecursos[0];
    } catch (error) {
      throw `${error}`;
    }
  }

  async dataControlesImplementacion(id_plan) {
    try {
      const controlImplementacion = await sequelize.query(`
      EXEC sp_get_control_implementacion
      @Id_riesgo_plan_trabajo = ${id_plan}`);
      return controlImplementacion[0];
    } catch (error) {
      throw `${error}`;
    }
  }
  async dataControlesInternosPlan(id_plan) {
    try {
      const dataReporte = await sequelize.query(`
                EXEC sp_get_plan_controles_internos
                @Id_riesgo_plan_trabajo = ${id_plan}`);
      return dataReporte;
    } catch (error) {
      throw `${error}`;
    }
  }
}

module.exports = PlanTrabajoReporteService;
