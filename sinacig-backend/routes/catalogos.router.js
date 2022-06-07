const express = require('express');
const router = express.Router();
const CatalogosService = require('../services/catalogos.service');

const catalogosServiceI = new CatalogosService();

router.get('/unidad_ejecutora', async (req, res, next) => {
  try {
    const unidadesEjecutoras = await catalogosServiceI.findUnidadEjecutora();
    res.json(unidadesEjecutoras);
  } catch (error) {
    next(error);
  }
});

router.get('/unidad_ejecutoraByid/:id_unidad', async (req, res, next) => {
  try {
    const { id_unidad } = req.params;
    const unidadesEjecutoras =
      await catalogosServiceI.findUnidadEjecutoraByCodigo(id_unidad);
    res.json(unidadesEjecutoras);
  } catch (error) {
    next(error);
  }
});

router.get('/roles', async (req, res, next) => {
  try {
    const roles = await catalogosServiceI.findRoles();
    res.json(roles);
  } catch (error) {
    next(error);
  }
});

router.get('/control_mitigador', async (req, res, next) => {
  try {
    const control = await catalogosServiceI.findControlMitigador();
    res.json(control);
  } catch (error) {
    next(error);
  }
});

router.get('/periodos', async (req, res, next) => {
  try {
    const periodos = await catalogosServiceI.findPeriodos();
    res.json(periodos);
  } catch (error) {
    next(error);
  }
});

router.get('/tipo_objetivo', async (req, res, next) => {
  try {
    const tipoObjetivos = await catalogosServiceI.findTipoObjetivo();
    res.json(tipoObjetivos);
  } catch (error) {
    next(error);
  }
});

router.get('/severidad', async (req, res, next) => {
  try {
    const severidad = await catalogosServiceI.findSeveridad();
    res.json(severidad);
  } catch (error) {
    next(error);
  }
});

// router.get('/referencia', async (req, res, next) => {
//   try {
//     const referencia = await catalogosServiceI.findReferencia();
//     res.json(referencia);
//   } catch (error) {
//     next(error);
//   }
// });

router.get('/area_evaluada', async (req, res, next) => {
  try {
    const areaEvaluada = await catalogosServiceI.findAreaEvaluada();
    res.json(areaEvaluada);
  } catch (error) {
    next(error);
  }
});

router.get('/eventos', async (req, res, next) => {
  try {
    const eventos = await catalogosServiceI.findEventos();
    res.json(eventos);
  } catch (error) {
    next(error);
  }
});

router.get('/probabilidad', async (req, res, next) => {
  try {
    const probabilidades = await catalogosServiceI.findProbabilidad();
    res.json(probabilidades);
  } catch (error) {
    next(error);
  }
});

router.get('/medida_riesgo', async (req, res, next) => {
  try {
    const medidas = await catalogosServiceI.findMedidaRiesgo();
    res.json(medidas);
  } catch (error) {
    next(error);
  }
});

router.get('/prioridad', async (req, res, next) => {
  try {
    const prioridad = await catalogosServiceI.findPrioridad();
    res.json(prioridad);
  } catch (error) {
    next(error);
  }
});

router.get('/puesto_responsable', async (req, res, next) => {
  try {
    const puestoResponsable = await catalogosServiceI.findPuestoResponsable();
    res.json(puestoResponsable);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
