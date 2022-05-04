const bcrypt = require('bcryptjs');
const sequelize = require('../libs/sequelize');
const { models } = require('../libs/sequelize');
const CryptoJS = require('crypto-js');
const boom = require('@hapi/boom');

class UsuarioService {
  constructor() {}

  async autenticarUsuario(usuarioName) {
    const result = await models.Usuario.findOne({
      where: {
        usuario: usuarioName,
        estado_registro: 1,
      },
    });
    return result.dataValues;
  }

  // async registrarUsuario(data) {
  //   const result = await sequelize.query(
  //     `EXEC sp_registrar_usuario
  //       @id_rol = "${data.id_rol}",
  //       @usuario = "${data.usuario}",
  //       @cui = "${data.cui}",
  //       @nombres = "${data.nombres}",
  //       @apellidos = "${data.apellidos}",
  //       @password = "${CryptoJS.MD5(data.password || '').toString()}",
  //       @id_usuario_ingreso = "${data.id_usuario_ingreso}"`
  //   );
  //   return result[0];
  // }
  async registrarUsuario(data) {
    const password = await bcrypt.hash(data.password, 10);
    const newUser = {
      ...data,
      password: password,
    };
    try {
      const usuarioCreado = await models.Usuario.create(newUser);
      delete usuarioCreado.dataValues.password;
      return usuarioCreado;
    } catch (error) {
      throw boom.internal('Error en el servidor');
    }
  }

  async inactivarUsuario(idUsuario) {
    const result = await sequelize.query(
      `EXEC sp_inactivar_usuario @id_usuario = "${idUsuario}";`
    );
    return result[0];
  }

  async actualizarUsuario(data) {
    const result = await sequelize.query(
      `EXEC sp_actualizar_usuario
            @id_usuario = "${data.id_usuario}",
            @id_rol = "${data.id_rol}",
            @cui = "${data.cui}",
            @nombres = "${data.nombres}",
            @apellidos = "${data.apellidos}",
            @password = "${
              data.password
                ? CryptoJS.MD5(data.password || '').toString()
                : 'NULL'
            }",
            @id_usuario_ingreso = "${data.id_usuario_ingreso}"`
    );
    return result[0];
  }

  async obtenerUsuarios() {
    const result = await sequelize.query(`EXEC sp_obtener_usuarios`);
    return result[0];
  }

  async obtenerUsuario(id_usuario) {
    const result = await models.Usuario.findOne({
      where: {
        id_usuario,
        estado_registro: 1,
      },
    });
    return result.dataValues;
  }
  ////////prueba auth usuarios
  async autenticarUsuarioPrueba() {}
}

module.exports = UsuarioService;
