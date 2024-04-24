const express = require('express');
const router = express.Router();
const passport = require('passport');

const RiesgoControlInternoService = require('../services/riesgo_control_interno.service');
const { checkRoles } = require('../middlewares/auth.handler');

const riesgoControlInternoService = new RiesgoControlInternoService();

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1, 2, 3),
  async (req, res, next) => {
    try {
      const body = req.body;
      const result =
        await riesgoControlInternoService.createRiesgoControlInterno(body);
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
      const result = await riesgoControlInternoService.findRiesgoControlInterno(
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
      const result = await riesgoControlInternoService.deleteControlInterno(
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
