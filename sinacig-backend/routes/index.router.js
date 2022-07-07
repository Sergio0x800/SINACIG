const express = require('express');
const catalogosRouter = require('./catalogos.router');
const riesgoRouter = require('./riesgo.router');
const riesgoPlanTrabajoRouter = require('./riesgo_plan_trabajo.router');
const riesgoControlInterno = require('./riesgo_control_interno.router');
const recursos = require('./recursos.router');
const controlInternoPlan = require('./plan_control_interno.router');
const riesgoControlImplementacion = require('./riesgo_control_implementacion.router');
const usuarioRouter = require('./usuario.router');
const matrizRouter = require('./matriz.router');
const correlativoRouter = require('./correlativo.router');
const authRouter = require('./auth.router');
const logRouter = require('./logs.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/catalogos', catalogosRouter);
  router.use('/riesgo', riesgoRouter);
  router.use('/riesgo_plan_trabajo', riesgoPlanTrabajoRouter);
  router.use('/riesgo_control_interno', riesgoControlInterno);
  router.use('/recursos', recursos);
  router.use('/controlInternoPlan', controlInternoPlan);
  router.use('/implementacion', riesgoControlImplementacion);
  router.use('/usuario', usuarioRouter);
  router.use('/matriz', matrizRouter);
  router.use('/correlativo', correlativoRouter);
  router.use('/auth', authRouter);
  router.use('/log', logRouter);
}

module.exports = routerApi;
