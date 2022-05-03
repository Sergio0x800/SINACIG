const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const bcryptjs = require('bcryptjs');

const UsuarioService = require('../../services/usuario.service');
const usuarioService = new UsuarioService();

const LocalStrategy = new Strategy(
  {
    usernameField: 'usuario',
    passwordField: 'password',
  },
  async (userName, password, done) => {
    try {
      const usuario = await usuarioService.autenticarUsuario(userName);
      if (!usuario) {
        done(boom.unauthorized(), false);
      }
      const isMatch = await bcryptjs.compare(password, usuario.password);
      if (!isMatch) {
        done(boom.unauthorized(), false);
      }
      delete usuario.password;
      done(null, usuario);
    } catch (error) {
      done(error, false);
    }
  }
);

module.exports = LocalStrategy;
