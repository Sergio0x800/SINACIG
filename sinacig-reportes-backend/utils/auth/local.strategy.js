// const { Strategy } = require('passport-local');
// const boom = require('@hapi/boom');
// const bcryptjs = require('bcryptjs');

// const UsuariosService = require('../../services/usuarios.service');
// const usuariosService = new UsuariosService();

// const LocalStrategy = new Strategy(
//   {
//     usernameField: 'USUARIO',
//     passwordField: 'PASSWORD',
//   },
//   async (userName, password, done) => {
//     try {
//       const usuario = await usuariosService.findOneUsuarioByUserName(userName);
//       if (!usuario) {
//         done(boom.unauthorized(), false);
//       }
//       const isMatch = await bcryptjs.compare(password, usuario.PASSWORD);
//       if (!isMatch) {
//         done(boom.unauthorized(), false);
//       }
//       delete usuario.PASSWORD;
//       done(null, usuario);
//     } catch (error) {
//       done(error, false);
//     }
//   }
// );

// module.exports = LocalStrategy;
