const express = require('express');
const router = express.Router();
const RiesgoControlInternoService = require('../services/riesgo_control_interno.service');

const riesgoControlInternoService = new RiesgoControlInternoService();

router.post('/', async (req, res, next) => {
  try {
    const dataRiesgoControlInterno = req.body;
    const riesgoControlInternoAdded =
      await riesgoControlInternoService.createRiesgoControlInterno(
        dataRiesgoControlInterno
      );
    res.json(riesgoControlInternoAdded);
  } catch (error) {
    next(error);
  }
});

router.get('/:id_plan', async (req, res, next) => {
  try {
    const { id_plan } = req.params;
    const control_interno =
      await riesgoControlInternoService.findRiesgoControlInterno(id_plan);
    res.json(control_interno);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id_control', async (req, res, next) => {
  try {
    const { id_control } = req.params;
    const dataControl = req.body;
    const updatedControl =
      await riesgoControlInternoService.deleteControlInterno(
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
