const express = require('express');
const router = express.Router();
const UsuarioService = require('../services/usuario.service');

const passport = require('passport');
const { checkRoles } = require('../middlewares/auth.handler');

const usuarioService = new UsuarioService();

router.post('/', async (req, res, next) => {
  try {
    const data = req.body;
    let result = await usuarioService.registrarUsuario(data);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const result = await usuarioService.obtenerUsuarios();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1, 2),
  async (req, res, next) => {
    const user = req.user;
    try {
      const usuario = await usuarioService.obtenerUsuario(user.sub);
      delete usuario.password;
      delete usuario.id_usuario_ingreso;
      delete usuario.estado_registro;
      delete usuario.fecha_insert;
      delete usuario.sesion_activa;
      delete usuario.cui;
      res.json(usuario);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/verifica/:cui', async (req, res, next) => {
  try {
    const { cui } = req.params;
    const result = await usuarioService.obtenerUsuariosByCui(cui);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id_usuario', async (req, res, next) => {
  try {
    const { id_usuario } = req.params;
    const result = await usuarioService.inactivarUsuario(id_usuario);
    res.json(result[0]);
  } catch (error) {
    next(error);
  }
});

router.put('', async (req, res, next) => {
  try {
    const data = req.body;
    const result = await usuarioService.actualizarUsuario(data);
    res.json(result[0]);
  } catch (error) {
    next(error);
  }
});

router.post('/autenticar', async (req, res, next) => {
  try {
    const data = req.body;
    const result = await usuarioService.autenticarUsuario(data);
    res.json(result[0]);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
