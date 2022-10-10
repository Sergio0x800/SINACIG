const express = require('express');
const router = express.Router();
const passport = require('passport');

const MonitoreoService = require('../services/monitoreo.service');
const { checkRoles } = require('../middlewares/auth.handler');

const monitoreoService = new MonitoreoService();

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1, 2),
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

module.exports = router;
