const { Model, DataTypes } = require('sequelize');

const RIESGO_TABLE = 'tt_riesgo';

const RiesgoSchema = {
  id_riesgo: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  id_tipo_objetivo: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  codigo_referencia: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  id_area_evaluada: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  id_unidad_ejecutora: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  id_eventos_identificados: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  descripcion_riesgo: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  fecha_encontrado: {
    allowNull: true,
    type: DataTypes.DATEONLY,
  },
  id_probabilidad: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  id_severidad: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  riesgo_inherente: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  valor_control_mitigador: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  riesgo_residual: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  id_medida_riesgo: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  observaciones: {
    allowNull: true,
    type: DataTypes.STRING,
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

class Riesgo extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: RIESGO_TABLE,
      modelName: 'Riesgo',
      timestamps: false,
    };
  }
}

module.exports = {
  Riesgo, //modelo
  RiesgoSchema, //, esquema
};
