const { Model, DataTypes } = require('sequelize');

const TIPO_OBJETIVO_TABLE = 'tc_tipo_objetivo';

const TipoObjetivoSchema = {
  id_tipo_objetivo: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  descripcion: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  estado_registro: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  codigo_referencia: {
    allowNull: true,
    type: DataTypes.STRING,
  },
};

class TipoObjetivo extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TIPO_OBJETIVO_TABLE,
      modelName: 'TipoObjetivo',
      timestamps: false,
    };
  }
}

module.exports = {
  TipoObjetivoSchema, //, esquema
  TipoObjetivo, //modelo
};
