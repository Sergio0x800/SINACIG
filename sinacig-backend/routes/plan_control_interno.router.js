const express = require('express');
const router = express.Router();
const ControlInternoPlanService = require('../services/plan_control_interno.service');

const controlService = new ControlInternoPlanService();

router.post('/', async (req, res, next) => {
  try {
    const dataControl = req.body;
    const result = await controlService.createControlInternoPlan(dataControl);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/riesgos/:id_riesgo', async (req, res, next) => {
  try {
    const { id_riesgo } = req.params;
    const result = await controlService.findControlInternoPlanByIdRiesgo(
      id_riesgo
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// router.get('/:id_plan', async (req, res, next) => {
//   try {
//     const { id_plan } = req.params;
//     const recursos = await recursosService.findRecursosByIdPlan(id_plan);
//     res.json(recursos);
//   } catch (error) {
//     next(error);
//   }
// });

router.patch('/:id_plan', async (req, res, next) => {
  try {
    const { id_plan } = req.params;
    const dataRecurso = req.body;
    const result = await controlService.deleteControlInternoPlan(
      id_plan,
      dataRecurso
    );
    res.json({
      result,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
