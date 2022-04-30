const express = require('express');
const router = express.Router();
const UsuarioService = require('../services/usuario.service')

const usuarioService = new UsuarioService();

router.post('/', async (req, res, next) => {
  try {
    const data = req.body;
    let result = await usuarioService.registrarUsuario(data);
    res.json(result[0]);
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
