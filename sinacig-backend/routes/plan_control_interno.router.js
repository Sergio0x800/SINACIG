const express = require('express');
const router = express.Router();
const passport = require('passport');

const ControlInternoPlanService = require('../services/plan_control_interno.service');
const { checkRoles } = require('../middlewares/auth.handler');

const controlService = new ControlInternoPlanService();

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1, 2, 3),
  async (req, res, next) => {
    try {
      const body = req.body;
      const result = await controlService.createControlInternoPlan(body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/riesgos/:id_riesgo',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1, 2, 3),
  async (req, res, next) => {
    try {
      const { id_riesgo } = req.params;
      const result = await controlService.findControlInternoPlanByIdRiesgo(
        id_riesgo
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
  checkRoles(1, 2, 3),
  async (req, res, next) => {
    try {
      const { id_plan } = req.params;
      const body = req.body;
      const result = await controlService.deleteControlInternoPlan(
        id_plan,
        body
      );
      res.json({
        result,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
