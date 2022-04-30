const sequelize = require('../libs/sequelize');

class EvaluacionRiesgoReporteService{
    constructor(){}

    async dataReporteEvaluacionRiesgo(cod_unidad_ejecutora, fechaInicio, fechaFin){
        try {
            const dataReporte = await sequelize.query(`
                EXEC sp_reporte_matriz_riesgo
                @ue = ${cod_unidad_ejecutora},
                @fecha_inicio = '${fechaInicio}',
                @fecha_fin = '${fechaFin}'
            `);
            return dataReporte;
        } catch (error) {
            console.log(error.message);
            throw `${error}`;
        }
    }
}

module.exports = EvaluacionRiesgoReporteService;