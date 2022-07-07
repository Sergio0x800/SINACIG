const express = require('express');
const router = express.Router();
const passport = require('passport');

const MatrizService = require('../services/matriz.service');
const { checkRoles } = require('../middlewares/auth.handler');

const matrizService = new MatrizService();

//crear encabezado matriz periodos
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1, 2),
  async (req, res, next) => {
    try {
      const body = req.body;
      const result = await matrizService.createMatriz(body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

//buscar encabezado matriz periodos por parametros
router.get(
  '/byParams',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1, 2),
  async (req, res, next) => {
    try {
      const queryParams = req.query;
      const result = await matrizService.findMatrizByUnidadFecha(queryParams);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

//Encontrar encabezados matriz periodos con periodos abiertos
router.get(
  '/periodoAbierto',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1, 2),
  async (req, res, next) => {
    const queryParams = req.query;
    try {
      const result = await matrizService.findMatrizPeriodoAbierto(queryParams);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

//buscar encabezado matriz periodos por id_matriz
router.get(
  '/:id_matriz',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1, 2),
  async (req, res, next) => {
    try {
      const params = req.params;
      const matrizPeriodos = await matrizService.findMatrizById(params);
      res.json(matrizPeriodos);
    } catch (error) {
      next(error);
    }
  }
);

//Modificar encabezados matriz periodos
router.patch(
  '/update/:id_matriz',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1),
  async (req, res, next) => {
    try {
      const params = req.params;
      const body = req.body;
      const updatedMatriz = await matrizService.updateMatrizPeriodo(
        params,
        body
      );
      res.json(updatedMatriz);
    } catch (error) {
      next(error);
    }
  }
);

//Eliminacion encabezado matriz periodos
router.patch(
  '/:id_matriz',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1),
  async (req, res, next) => {
    try {
      const params = req.params;
      const result = await matrizService.deleteMatriz(params);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
