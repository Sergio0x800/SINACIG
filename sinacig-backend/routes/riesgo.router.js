const express = require('express');
const router = express.Router();
const RiesgoService = require('../services/riesgo.service');

const riesgoService = new RiesgoService();

router.post('/', async (req, res, next) => {
  try {
    const dataRiesgo = req.body;
    const riesgo = await riesgoService.createRiesgo(dataRiesgo);
    res.json(riesgo.id_riesgo);
  } catch (error) {
    next(error);
  }
});

// router.get('/', async (req, res, next) => {
//   try {
//     const { unidadEjecutora, fechaInicio, fechaFin } = req.query;
//     const riesgos = await riesgoService.findRiesgosByUnidadFecha(
//       parseInt(unidadEjecutora),
//       fechaInicio,
//       fechaFin
//     );
//     res.json(riesgos);
//   } catch (error) {
//     next(error);
//   }
// });

router.get('/update/:id_riesgo', async (req, res, next) => {
  try {
    const { id_riesgo } = req.params;
    const riesgo = await riesgoService.findRiesgoToEdit(id_riesgo);
    res.json(riesgo);
  } catch (error) {
    next(error);
  }
});

router.get('/search/:id_riesgo', async (req, res, next) => {
  try {
    const { id_riesgo } = req.params;
    const riesgo = await riesgoService.findRiesgoById(id_riesgo);
    res.json(riesgo);
  } catch (error) {
    next(error);
  }
});

router.get('/:id_matriz/:offset', async (req, res, next) => {
  try {
    const { id_matriz, offset } = req.params;
    const riesgo = await riesgoService.findRiesgoByIdMatriz(id_matriz, offset);
    res.json(riesgo);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id_riesgo', async (req, res, next) => {
  try {
    const { id_riesgo } = req.params;
    const dataRiesgo = req.body;
    const updatedRiesgo = await riesgoService.deleteRiesgo(
      id_riesgo,
      dataRiesgo
    );
    res.json({
      message: 'Riesgo actualizado correctamente',
      registro: updatedRiesgo,
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/update/:id_riesgo', async (req, res, next) => {
  try {
    const { id_riesgo } = req.params;
    const data = req.body;
    const result = await riesgoService.updateRiesgo(id_riesgo, data);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
