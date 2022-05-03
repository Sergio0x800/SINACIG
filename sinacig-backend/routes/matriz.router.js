const express = require('express');
const router = express.Router();
const MatrizService = require('../services/matriz.service');
const passport = require('passport');

const matrizService = new MatrizService();

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const dataMatriz = req.body;
      // const dataMatrizFixed = {
      //   ...dataMatriz,
      //   id_unidad_ejecutora: parseInt(dataMatriz.id_unidad_ejecutora),
      // };
      const matrizAdded = await matrizService.createMatriz(dataMatriz);
      res.json(matrizAdded);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/', async (req, res, next) => {
  try {
    const { id_unidad_ejecutora, fecha_periodo_inicio, fecha_periodo_fin } =
      req.query;
    const matrizPeriodos = await matrizService.findMatrizByUnidadFecha(
      id_unidad_ejecutora,
      fecha_periodo_inicio,
      fecha_periodo_fin
    );
    res.json(matrizPeriodos);
  } catch (error) {
    next(error);
  }
});

router.get('/form/:id_matriz', async (req, res, next) => {
  try {
    const { id_matriz } = req.params;
    const matrizPeriodos = await matrizService.findMatrizByIdForm(id_matriz);
    res.json(matrizPeriodos);
  } catch (error) {
    next(error);
  }
});

router.get('/update/:id_matriz', async (req, res, next) => {
  try {
    const { id_matriz } = req.params;
    const matrizPeriodos = await matrizService.findMatrizById(id_matriz);
    res.json(matrizPeriodos);
  } catch (error) {
    next(error);
  }
});

router.patch('/update/:id_matriz', async (req, res, next) => {
  try {
    const { id_matriz } = req.params;
    const dataMatriz = req.body;
    const updatedMatriz = await matrizService.updateMatrizPeriodo(
      id_matriz,
      dataMatriz
    );
    res.json(updatedMatriz);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id_matriz', async (req, res, next) => {
  try {
    const { id_matriz } = req.params;
    const dataMatriz = req.body;
    const updatedMatriz = await matrizService.deleteMatriz(
      id_matriz,
      dataMatriz
    );
    res.json(updatedMatriz);
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
