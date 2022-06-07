const sequelize = require('../libs/sequelize');
const { models } = require('../libs/sequelize');

class EvaluacionRiesgoReporteService {
  constructor() {}

  async dataReporteEvaluacionRiesgo(
    cod_unidad_ejecutora,
    fechaInicio,
    fechaFin
  ) {
    try {
      const dataReporte = await sequelize.query(
        `
                EXEC sp_reporte_matriz_riesgo
                @ue = ${cod_unidad_ejecutora},
                @fecha_inicio = '${fechaInicio}',
                @fecha_fin = '${fechaFin}'
            `
      );
      // .then((riesgos) => {
      //   return new Promise(function (resolve, reject) {
      //     let riesgosControles = riesgos[0].map((riesgo) => {
      //       return new Promise(function (resolve, reject) {
      //         const dataControl = await models.ControlInterno.findAll({
      //           where: {
      //             estado_registro: 1,
      //             id_riesgo: riesgo.id_riesgo,
      //           },
      //         });
      //         let nuevoRiesgo = {
      //           ...riesgo,
      //           controles: dataControl,
      //         };
      //         resolve(nuevoRiesgo);
      //       });
      //     });
      //     resolve(riesgosControles[0]);
      //   });
      // });

      return dataReporte;
    } catch (error) {
      throw `${error}`;
    }
  }

  async dataControlesInternos(id_riesgo) {
    try {
      const dataControl = await models.ControlInterno.findAll({
        where: {
          estado_registro: 1,
          id_riesgo: id_riesgo,
        },
      });
      // console.log(dataControl);
      return dataControl;
    } catch (error) {
      throw `${error}`;
    }
  }
}

module.exports = EvaluacionRiesgoReporteService;
