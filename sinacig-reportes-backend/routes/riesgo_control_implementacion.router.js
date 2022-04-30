const express = require('express');
const router = express.Router();
const RiesgoControlImplementacionService = require('../services/riesgo_control_implementacion.service');

const riesgoControlImplementacionService =
  new RiesgoControlImplementacionService();

router.post('/', async (req, res, next) => {
  try {
    const data = req.body;
    const implementacion =
      await riesgoControlImplementacionService.createRiesgoControlImplementacion(
        data
      );
    res.json(implementacion);
  } catch (error) {
    next(error);
  }
});

router.get('/:id_plan', async (req, res, next) => {
  try {
    const { id_plan } = req.params;
    const implementacion =
      await riesgoControlImplementacionService.findRiesgoControlImplementacion(
        id_plan
      );
    res.json(implementacion);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id_control', async (req, res, next) => {
  try {
    const { id_control } = req.params;
    const dataControl = req.body;
    const updatedControl =
      await riesgoControlImplementacionService.deletecontrolImplementacion(
        id_control,
        dataControl
      );
    res.json({
      updatedControl,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
