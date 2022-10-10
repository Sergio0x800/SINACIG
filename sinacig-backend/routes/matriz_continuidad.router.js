const express = require('express');
const router = express.Router();
const passport = require('passport');

const MatrizcontinuidadService = require('../services/matriz_continuidad.service');
const { checkRoles } = require('../middlewares/auth.handler');

const matrizContinuidadService = new MatrizcontinuidadService();

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1, 2),
  async (req, res, next) => {
    try {
      const data = req.body;
      console.log(data);
      const result = await matrizContinuidadService.createMatrizcontinuidad(
        data
      );
      res.json(result.id_riesgo_continuidad);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
