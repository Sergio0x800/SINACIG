const express = require('express');
const router = express.Router();
const passport = require('passport');

const MonitoreoService = require('../services/monitoreo.service');
const { checkRoles } = require('../middlewares/auth.handler');

const monitoreoService = new MonitoreoService();

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1, 2, 3),
  async (req, res, next) => {
    try {
      const data = req.body;
      await monitoreoService.createMetodoMonitoreo(data);
      res.json({ message: 'Registro exitoso' });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/update/:id_riesgo_continuidad',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1, 2, 3),
  async (req, res, next) => {
    try {
      const { id_riesgo_continuidad } = req.params;
      const result =
        await monitoreoService.getMetodoMonitoreoByIdRiesgoContinuidad(
          id_riesgo_continuidad
        );
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/delete/:id_detalle_monitoreo',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1, 2, 3),
  async (req, res, next) => {
    try {
      const { id_detalle_monitoreo } = req.params;
      const changes = req.body;
      const result = await monitoreoService.deleteLogicoMetodoMonitoreo(
        changes,
        id_detalle_monitoreo
      );
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
