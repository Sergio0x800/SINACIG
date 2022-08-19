const express = require('express');
const router = express.Router();
const passport = require('passport');

const RiesgoPlanTrabajoService = require('../services/riesgo_plan_trabajo.service');
const moment = require('moment');
const { checkRoles } = require('../middlewares/auth.handler');

const riesgoPlanTrabajoService = new RiesgoPlanTrabajoService();

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1, 2),
  async (req, res, next) => {
    try {
      const data = req.body;
      const fecha_inicio = moment(data.fecha_inicio, 'DD/MM/YYYY').format(
        'YYYY-MM-DD'
      );
      const fecha_fin = moment(data.fecha_fin, 'DD/MM/YYYY').format(
        'YYYY-MM-DD'
      );
      const newPlan = {
        ...data,
        fecha_inicio,
        fecha_fin,
      };
      const result = await riesgoPlanTrabajoService.createRiesgoPlanTrabajo(
        newPlan
      );
      res.json(result.id_riesgo_plan_trabajo);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/existencia_plan/:id_matriz',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1, 2),
  async (req, res, next) => {
    try {
      const { id_matriz } = req.params;
      const result = await riesgoPlanTrabajoService.findExistenciaPlanTrabajo(
        id_matriz
      );
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/update/:id_plan',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1, 2),
  async (req, res, next) => {
    try {
      const { id_plan } = req.params;
      const result = await riesgoPlanTrabajoService.findPlanTrabajoByIdD(
        id_plan
      );
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id_riesgo',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1, 2),
  async (req, res, next) => {
    try {
      const { id_riesgo } = req.params;
      const result = await riesgoPlanTrabajoService.findPlanTrabajoByIdRiesgo(
        id_riesgo
      );
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/estadoPlanByRiesgo/:id_riesgo',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1, 2),
  async (req, res, next) => {
    try {
      const { id_riesgo } = req.params;
      const body = req.body;
      const result = await riesgoPlanTrabajoService.deletePlanTrabajoByIdRiesgo(
        id_riesgo,
        body
      );
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id_plan',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1, 2),
  async (req, res, next) => {
    try {
      const { id_plan } = req.params;
      const body = req.body;
      const result = await riesgoPlanTrabajoService.updatePlan(id_plan, body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
