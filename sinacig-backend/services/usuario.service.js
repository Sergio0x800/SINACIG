const bcrypt = require('bcryptjs');
const sequelize = require('../libs/sequelize');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { models } = require('../libs/sequelize');
// const CryptoJS = require('crypto-js');
const boom = require('@hapi/boom');

class UsuarioService {
  constructor() {}

  async autenticarUsuario(usuarioName) {
    const result = await sequelize.query(
      `EXEC sp_autenticar_usuario @usuario = "${usuarioName}";`
    );
    if (result[0].length == 0) {
      return null;
    } else {
      return result[0][0];
    }
  }

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
    try {
      const result = await sequelize.query(
        `EXEC sp_actualizar_usuario
              @id_usuario = ${data.id_usuario},
              @id_rol = ${data.id_rol},
              @cui = ${data.cui},
              @nombres = '${data.nombres}',
              @apellidos = '${data.apellidos}',
              @password = '${
                data.password
                  ? await bcrypt.hash(
                      data.password,
                      10
                    ) /*CryptoJS.MD5(data.password || '').toString()*/
                  : null
              }',
              @id_usuario_ingreso = ${
                data.id_usuario_ingreso ? data.id_usuario_ingreso : null
              },
              @id_unidad_ejecutora = ${data.id_unidad_ejecutora}
              `
      );
      return result[0];
    } catch (error) {
      throw `${error}`;
    }
  }

  async obtenerUsuarios() {
    // const result = await sequelize.query(`EXEC sp_obtener_usuarios`);
    const rst = await models.Usuario.findAll({
      where: {
        estado_registro: 1,
      },
    });
    return rst;
  }

  async obtenerUsuariosByCui(cui, usuario) {
    const result = await models.Usuario.findOne({
      where: {
        [Op.or]: {
          cui,
          usuario,
        },
        [Op.and]: {
          estado_registro: 1,
        },
      },
    });
    if (!result) {
      throw boom.notFound('No se encontro el registro solicitado');
    }
    const newResult = {
      usuario: result.usuario,
      cui: result.cui,
    };
    return newResult;
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
