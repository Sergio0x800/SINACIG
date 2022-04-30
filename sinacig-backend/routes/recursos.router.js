const express = require('express');
const router = express.Router();
const RecursosService = require('../services/recursos.service');

const recursosService = new RecursosService();

router.post('/', async (req, res, next) => {
  try {
    const dataRecursos = req.body;
    const recursoAdded = await recursosService.createRecurso(dataRecursos);
    res.json(recursoAdded);
  } catch (error) {
    next(error);
  }
});

router.get('/riesgos/:id_riesgo', async (req, res, next) => {
  try {
    const { id_riesgo } = req.params;
    const recursos = await recursosService.findRecursosByIdRiesgo(id_riesgo);
    res.json(recursos);
  } catch (error) {
    next(error);
  }
});

router.get('/:id_plan', async (req, res, next) => {
  try {
    const { id_plan } = req.params;
    const recursos = await recursosService.findRecursosByIdPlan(id_plan);
    res.json(recursos);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id_recurso', async (req, res, next) => {
  try {
    const { id_recurso } = req.params;
    const dataRecurso = req.body;
    const updateRecurso = await recursosService.deleteRecurso(
      id_recurso,
      dataRecurso
    );
    res.json({
      updateRecurso,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
