const express = require('express');
const router = express.Router();
const passport = require('passport');

const RiesgoControlImplementacionService = require('../services/riesgo_control_implementacion.service');
const { checkRoles } = require('../middlewares/auth.handler');

const riesgoControlImplementacionService =
  new RiesgoControlImplementacionService();

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1, 2, 3),
  async (req, res, next) => {
    try {
      const body = req.body;
      const result =
        await riesgoControlImplementacionService.createRiesgoControlImplementacion(
          body
        );
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/riesgo/:id_riesgo',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1, 2, 3),
  async (req, res, next) => {
    try {
      const { id_riesgo } = req.params;
      const result =
        await riesgoControlImplementacionService.findRiesgoControlImplementacionByIdRiesgo(
          id_riesgo
        );
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id_plan',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1, 2, 3),
  async (req, res, next) => {
    try {
      const { id_plan } = req.params;
      const result =
        await riesgoControlImplementacionService.findRiesgoControlImplementacion(
          id_plan
        );
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id_control',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1, 2, 3),
  async (req, res, next) => {
    try {
      const { id_control } = req.params;
      const body = req.body;
      const result =
        await riesgoControlImplementacionService.deletecontrolImplementacion(
          id_control,
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
