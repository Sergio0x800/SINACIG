const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer = require('multer');
const fs = require('fs');

const SeguimientoService = require('../services/seguimiento.service');
const { checkRoles } = require('../middlewares/auth.handler');

const seguimientoService = new SeguimientoService();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file);
    const carpetaDestino = `archivos_seguimiento/`;
    if (!fs.existsSync(carpetaDestino)) {
      fs.mkdirSync(carpetaDestino, { recursive: true });
    }
    cb(null, carpetaDestino); // Ruta donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Nombre del archivo en el servidor
  },
});

const upload = multer({ storage: storage });

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1, 2, 3),
  async (req, res, next) => {
    try {
      let seguimiento = req.body;
      await seguimientoService.createSeguimiento(seguimiento);
      res.status(200).json({ result: 'ok' });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/archivosSeguimiento',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1, 2, 3),
  upload.array('archivos', 10),
  async (req, res, next) => {
    try {
      // console.log('Archivos: true');
      // console.log(req.body);
      res.json({});
      // let archivos = req.body;
      // const result = await seguimientoService.insertArchivosSeguimiento(archivos);
      // res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
