const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const SeguimientoService = require('../services/seguimiento.service');
const { checkRoles } = require('../middlewares/auth.handler');

const seguimientoService = new SeguimientoService();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const idNombre = file.originalname.split('|');
    const carpetaDestino = `archivos_seguimiento/${idNombre[0]}`;
    if (!fs.existsSync(carpetaDestino)) {
      fs.mkdirSync(carpetaDestino, { recursive: true });
    }
    cb(null, carpetaDestino); // Ruta donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    const idNombre = file.originalname.split('|');
    cb(null, idNombre[1]); // Nombre del archivo en el servidor
  },
});

const upload = multer({ storage: storage });

router.post(
  '/getSeguimientos',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1, 2, 3),
  async (req, res, next) => {
    try {
      let { id_riesgo } = req.body;
      const result = await seguimientoService.getSeguimientos(id_riesgo);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  '/getArchivosSeguimientos',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1, 2, 3),
  async (req, res, next) => {
    try {
      let { id_seguimiento_riesgo } = req.body;
      const result = await seguimientoService.getArchivosSeguimientos(
        id_seguimiento_riesgo
      );
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  '/descargarArchivoSeguimiento',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1, 2, 3),
  async (req, res, next) => {
    try {
      const nombreArchivo = req.body.nombreArchivo;
      const id_riesgo = req.body.id_riesgo;
      const rutaArchivo = path.join(
        __dirname,
        `../archivos_seguimiento/${id_riesgo}`,
        nombreArchivo
      );
      // Verifica si el archivo existe
      if (fs.existsSync(rutaArchivo)) {
        // Configura los encabezados de la respuesta para la descarga
        res.setHeader(
          'Content-disposition',
          `attachment; filename=${nombreArchivo}`
        );
        res.setHeader('Content-type', 'application/octet-stream');

        // Crea un flujo de lectura para enviar el archivo
        const archivoStream = fs.createReadStream(rutaArchivo);

        // Transfiere el archivo al cliente
        archivoStream.pipe(res);
      } else {
        // Si el archivo no existe, envía una respuesta de error
        res.status(404).send('Archivo no encontrado');
      }
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1, 2, 3),
  async (req, res, next) => {
    try {
      let seguimiento = req.body;
      const result = await seguimientoService.createSeguimiento(seguimiento);
      res.json(result[0][0].id_seguimiento_riesgo);
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
      const archivos = req.files;
      const { id_seguimiento_riesgo } = req.body;
      const { id_usuario_registro } = req.body;
      archivos.forEach(async (archivo) => {
        await seguimientoService.createSeguimientoArchivo(
          archivo,
          id_seguimiento_riesgo,
          id_usuario_registro
        );
      });
      res.json({
        status: 'ok',
      });
    } catch (error) {
      next(error.messege);
    }
  }
);
router.post(
  '/updateSeguimiento',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1, 2, 3),
  async (req, res, next) => {
    try {
      let seguimiento = req.body;
      const result = await seguimientoService.updateSeguimiento(seguimiento);
      res.json(result[0][0].id_seguimiento_riesgo);
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  '/deleteSeguimiento',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1, 2, 3),
  async (req, res, next) => {
    try {
      let seguimiento = req.body;
      const result = await seguimientoService.deleteSeguimiento(seguimiento);
      res.json(result[0][0].id_seguimiento_riesgo);
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  '/deleteSeguimientoArchivo',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1, 2, 3),
  async (req, res, next) => {
    try {
      let id_seguimiento_riesgo_archivo =
        req.body.id_seguimiento_riesgo_archivo;
      const result = await seguimientoService.deleteSeguimientoArchivo(
        id_seguimiento_riesgo_archivo
      );
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
