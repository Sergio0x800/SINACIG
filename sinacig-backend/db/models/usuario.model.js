const { Model, DataTypes } = require('sequelize');

const USUARIOS_TABLE = 'tc_usuario';

const UsuarioSchema = {
  id_usuario: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  id_rol: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  usuario: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  cui: {
    allowNull: true,
    type: DataTypes.NUMBER,
  },
  nombres: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  apellidos: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  password: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  id_usuario_ingreso: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  estado_registro: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  fecha_insert: {
    allowNull: true,
    type: DataTypes.DATE,
  },
  sesion_activa: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
};

class Usuario extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USUARIOS_TABLE,
      modelName: 'Usuario',
      timestamps: false,
    };
  }
}

module.exports = {
  Usuario, //modelo
  UsuarioSchema, //, esquema
};
