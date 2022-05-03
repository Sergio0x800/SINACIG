const express = require('express');
const reporteEvaluacionRiesgo = require('./reporte_evaluacion_riesgo');
const reportePlanTrabajo = require('./reporte_plan_trabajo');
const mapaRiesgo = require('./reporte_mapa_de_riesgo');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/reportes', reporteEvaluacionRiesgo);
  router.use('/reportes', reportePlanTrabajo);
  router.use('/reportes', mapaRiesgo);

}

module.exports = routerApi;
