const express = require('express');
const router = express.Router();
const CorrelativoService = require('../services/correlativo.service');

const correlativoService = new CorrelativoService();

router.post('/', async (req, res, next) => {
  try {
    const dataCorrelativo = req.body;
    const correlativoCreated = await correlativoService.createCorrelativo(
      dataCorrelativo
    );
    res.json(correlativoCreated);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const { id_matriz, id_tipo_objetivo } = req.query;
    const correlativo = await correlativoService.findCorrelativo(
      id_matriz,
      id_tipo_objetivo
    );
    res.json(correlativo);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id_correlativo_maximo', async (req, res, next) => {
  try {
    const { id_correlativo_maximo } = req.params;
    const dataCorrelativo = req.body;
    const updatedRiesgo = await correlativoService.deleteCorrelativo(
      id_correlativo_maximo,
      dataCorrelativo
    );
    res.json(updatedRiesgo);
  } catch (error) {
    next(error);
  }
});

// router.patch('/:id_recurso', async (req, res, next) => {
//   try {
//     const { id_recurso } = req.params;
//     const dataRecurso = req.body;
//     const updateRecurso = await recursosService.deleteRecurso(
//       id_recurso,
//       dataRecurso
//     );
//     res.json({
//       updateRecurso,
//     });
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
