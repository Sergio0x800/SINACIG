const { Model, DataTypes } = require('sequelize');

const ROL_TABLE = 'tc_rol';

const RolSchema = {
  id_rol: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  descripcion: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  usuario_registro: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  fecha_registro: {
    allowNull: true,
    type: DataTypes.DATE,
  },
  estado_registro: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
};

class Rol extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ROL_TABLE,
      modelName: 'Rol',
      timestamps: false,
    };
  }
}

module.exports = {
  Rol, //modelo
  RolSchema, //, esquema
};
