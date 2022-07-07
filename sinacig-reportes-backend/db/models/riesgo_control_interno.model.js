const { Model, DataTypes } = require('sequelize');

const CONTROL_INTERNO_TABLE = 'tt_riesgo_control_interno';

const ControlInternoSchema = {
  id_riesgo_control_interno: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  id_riesgo: {
    allowNull: false,
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
  usuario_registro: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  fecha_registro: {
    allowNull: true,
    type: DataTypes.DATE,
  },
};

class ControlInterno extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CONTROL_INTERNO_TABLE,
      modelName: 'ControlInterno',
      timestamps: false,
    };
  }
}

module.exports = {
  ControlInterno, //modelo
  ControlInternoSchema, //, esquema
};
