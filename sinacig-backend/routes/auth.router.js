const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const usuario = req.user;
      const payload = {
        sub: usuario.id_usuario,
        role: usuario.id_rol,
      };
      const token = jwt.sign(payload, config.jwtSecret);
      delete usuario.password;
      res.json({ usuario, token });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
