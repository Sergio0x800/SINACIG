const express = require('express');
const router = express.Router();
const passport = require('passport');

const RecursosService = require('../services/recursos.service');
const { checkRoles } = require('../middlewares/auth.handler');

const recursosService = new RecursosService();

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1, 2),
  async (req, res, next) => {
    try {
      const body = req.body;
      const result = await recursosService.createRecurso(body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/riesgos/:id_riesgo',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1, 2),
  async (req, res, next) => {
    try {
      const { id_riesgo } = req.params;
      const result = await recursosService.findRecursosByIdRiesgo(id_riesgo);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id_plan',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1, 2),
  async (req, res, next) => {
    try {
      const { id_plan } = req.params;
      const result = await recursosService.findRecursosByIdPlan(id_plan);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id_recurso',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1, 2),
  async (req, res, next) => {
    try {
      const { id_recurso } = req.params;
      const body = req.body;
      const result = await recursosService.deleteRecurso(id_recurso, body);
      res.json({
        result,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
