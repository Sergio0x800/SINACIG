const express = require('express');
const router = express.Router();
const passport = require('passport');

const RiesgoService = require('../services/riesgo.service');
const { checkRoles } = require('../middlewares/auth.handler');

const riesgoService = new RiesgoService();

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1, 2, 3),
  async (req, res, next) => {
    try {
      const dataRiesgo = req.body;
      const result = await riesgoService.createRiesgo(dataRiesgo);
      res.json(result.id_riesgo);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/filtro',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1, 2, 3),
  async (req, res, next) => {
    try {
      const filtro = req.query;
      const riesgo = await riesgoService.findRiesgoByFiltro(filtro);
      res.json(riesgo);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/update/:id_riesgo',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1, 2, 3),
  async (req, res, next) => {
    try {
      const { id_riesgo } = req.params;
      const riesgo = await riesgoService.findRiesgoToEdit(id_riesgo);
      res.json(riesgo);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/updateRef/:periodo_anio/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1, 3),
  async (req, res, next) => {
    try {
      const { periodo_anio } = req.params;
      await riesgoService.findRiesgoByIdMatrizUpdateRef(periodo_anio);
      res.json({
        message: 'ok',
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/search/:id_riesgo',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1, 2, 3),
  async (req, res, next) => {
    try {
      const { id_riesgo } = req.params;
      const result = await riesgoService.findRiesgoById(id_riesgo);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id_matriz/:offset',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1, 2, 3),
  async (req, res, next) => {
    try {
      const { id_matriz, offset } = req.params;
      const result = await riesgoService.findRiesgoByIdMatriz(
        id_matriz,
        offset
      );
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/matriz/:id_matriz',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1, 2, 3),
  async (req, res, next) => {
    try {
      const { id_matriz } = req.params;
      const dataRiesgo = req.body;
      const result = await riesgoService.deleteRiesgo(id_matriz, dataRiesgo);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/update/:id_riesgo',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1, 2, 3),
  async (req, res, next) => {
    try {
      const { id_riesgo } = req.params;
      const data = req.body;
      const result = await riesgoService.updateRiesgo(id_riesgo, data);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/delete/:id_riesgo',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1, 3),
  async (req, res, next) => {
    try {
      const { id_riesgo } = req.params;
      const data = req.body;
      const result = await riesgoService.deleteRiesgo(id_riesgo, data);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
