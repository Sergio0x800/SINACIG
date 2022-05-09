const express = require('express');
const router = express.Router();
const RiesgoPlanTrabajoService = require('../services/riesgo_plan_trabajo.service');
const moment = require('moment');

const riesgoPlanTrabajoService = new RiesgoPlanTrabajoService();

router.post('/', async (req, res, next) => {
  try {
    const data = req.body;
    const fecha_inicio = moment(data.fecha_inicio, 'DD/MM/YYYY').format(
      'YYYY-MM-DD'
    );
    const fecha_fin = moment(data.fecha_fin, 'DD/MM/YYYY').format('YYYY-MM-DD');
    const newPlan = {
      ...data,
      fecha_inicio,
      fecha_fin,
    };
    const planCreated = await riesgoPlanTrabajoService.createRiesgoPlanTrabajo(
      newPlan
    );
    res.json(planCreated.id_riesgo_plan_trabajo);
  } catch (error) {
    next(error);
  }
});

router.get('/existencia_plan/:id_matriz', async (req, res, next) => {
  try {
    const { id_matriz } = req.params;
    const result = await riesgoPlanTrabajoService.findExistenciaPlanTrabajo(
      id_matriz
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
});
router.get('/update/:id_plan', async (req, res, next) => {
  try {
    const { id_plan } = req.params;
    const plan = await riesgoPlanTrabajoService.findPlanTrabajoByIdD(id_plan);
    res.json(plan);
  } catch (error) {
    next(error);
  }
});

router.get('/:id_riesgo', async (req, res, next) => {
  try {
    const { id_riesgo } = req.params;
    const planes = await riesgoPlanTrabajoService.findPlanTrabajoByIdRiesgo(
      id_riesgo
    );
    res.json(planes);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id_plan', async (req, res, next) => {
  try {
    const { id_plan } = req.params;
    const dataPlan = req.body;
    const result = await riesgoPlanTrabajoService.updatePlan(id_plan, dataPlan);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
