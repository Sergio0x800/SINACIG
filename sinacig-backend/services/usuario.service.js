const sequelize = require('../libs/sequelize');
const CryptoJS = require('crypto-js');

class UsuarioService {

  constructor() {}

  async autenticarUsuario(data) {
    const result = await sequelize.query(
      `EXEC sp_autenticar_usuario @usuario = "${data.usuario}", @password = "${CryptoJS.MD5(data.password || '').toString()}"`
    );
    return result[0];
  }

  async registrarUsuario(data) {
    const result = await sequelize.query(
    `EXEC sp_registrar_usuario 
        @id_rol = "${data.id_rol}",
        @usuario = "${data.usuario}",
        @cui = "${data.cui}",
        @nombres = "${data.nombres}",
        @apellidos = "${data.apellidos}",
        @password = "${CryptoJS.MD5(data.password || '').toString()}",
        @id_usuario_ingreso = "${data.id_usuario_ingreso}"`
    );
    return result[0];
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
            @password = "${data.password ? CryptoJS.MD5(data.password || '').toString() : 'NULL'}",
            @id_usuario_ingreso = "${data.id_usuario_ingreso}"`
        );
    return result[0];
  }

  async obtenerUsuarios() {
    const result = await sequelize.query(
        `EXEC sp_obtener_usuarios`
    );
    return result[0];
  }
}

module.exports = UsuarioService;
