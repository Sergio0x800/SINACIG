const express = require('express');
const reporteEvaluacionRiesgo = require('./reporte_evaluacion_riesgo');
const reportePlanTrabajo = require('./reporte_plan_trabajo');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/reportes', reporteEvaluacionRiesgo);
  router.use('/reportes', reportePlanTrabajo);

}

module.exports = routerApi;
