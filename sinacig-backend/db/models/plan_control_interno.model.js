const { Model, DataTypes } = require('sequelize');

const CONTROL_INTERNO_PLAN_TABLE = 'tt_plan_control_interno';

const ControlInternoPlanSchema = {
  id_plan_control_interno: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  id_riesgo_plan_trabajo: {
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

class ControlInternoPlan extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CONTROL_INTERNO_PLAN_TABLE,
      modelName: 'ControlInternoPlan',
      timestamps: false,
    };
  }
}

module.exports = {
  ControlInternoPlan, //modelo
  ControlInternoPlanSchema, //, esquema
};
