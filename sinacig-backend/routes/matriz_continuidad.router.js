const express = require('express');
const router = express.Router();
const passport = require('passport');

const MatrizcontinuidadService = require('../services/matriz_continuidad.service');
const { checkRoles } = require('../middlewares/auth.handler');

const matrizContinuidadService = new MatrizcontinuidadService();

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1, 2, 3),
  async (req, res, next) => {
    try {
      const data = req.body;
      const result = await matrizContinuidadService.createMatrizcontinuidad(
        data
      );
      res.json(result.id_riesgo_continuidad);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/existencia/:id_matriz',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1, 2, 3),
  async (req, res, next) => {
    try {
      const { id_matriz } = req.params;
      const result =
        await matrizContinuidadService.findExistenciaMatrizContinuidad(
          id_matriz
        );
      res.json(result);
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
      const result = await matrizContinuidadService.getMatrizContinuidadById(
        id_riesgo_continuidad
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
  checkRoles(1, 2, 3),
  async (req, res, next) => {
    try {
      const { id_riesgo } = req.params;
      const result =
        await matrizContinuidadService.getMatrizContinuidadByIdRiesgo(
          id_riesgo
        );
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/updateData/:id_riesgo_continuidad',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1, 2, 3),
  async (req, res, next) => {
    try {
      const { id_riesgo_continuidad } = req.params;
      const changes = req.body;
      const result = await matrizContinuidadService.updateMatrizContinuidad(
        changes,
        id_riesgo_continuidad
      );
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
