const { Model, DataTypes } = require('sequelize');

const UNIDAD_TABLE = 'tc_unidad_ejecutora';

const UnidadSchema = {
  id_unidad_ejecutora: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  codigo_unidad: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  nombre_unidad: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  estado_registro: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
};

class Unidad extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: UNIDAD_TABLE,
      modelName: 'Unidad',
      timestamps: false,
    };
  }
}

module.exports = {
  UnidadSchema, //, esquema
  Unidad, //modelo
};
