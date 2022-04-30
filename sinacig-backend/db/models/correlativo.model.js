const { Model, DataTypes } = require('sequelize');

const CORRELATIVO_TABLE = 'ts_correlativo_maximo';

const CorrelativoSchema = {
  id_correlativo_maximo: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  id_matriz: {
    allowNull: false,
    autoIncrement: false,
    type: DataTypes.INTEGER,
  },
  id_tipo_objetivo: {
    allowNull: false,
    autoIncrement: false,
    type: DataTypes.INTEGER,
  },
  correlativo_maximo: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  estado_registro: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  usuario_registro: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  fecha_registro: {
    allowNull: true,
    type: DataTypes.DATE,
  },
};

class Correlativo extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CORRELATIVO_TABLE,
      modelName: 'Correlativo',
      timestamps: false,
    };
  }
}

module.exports = {
  Correlativo, //modelo
  CorrelativoSchema, //, esquema
};
