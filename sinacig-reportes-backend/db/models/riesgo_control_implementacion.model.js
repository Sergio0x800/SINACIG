const { Model, DataTypes } = require('sequelize');

const RIESGO_CONTROL_IMPLEMENTACION = 'tt_riesgo_plan_control_implementacion';

const ControlImplementacionSchema = {
  id_riesgo_plan_control_implementacion: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  id_riesgo_plan_trabajo: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  que: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  como: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  quien: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  cuando: {
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

class ControlImplementacion extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: RIESGO_CONTROL_IMPLEMENTACION,
      modelName: 'ControlImplementacion',
      timestamps: false,
    };
  }
}

module.exports = {
  ControlImplementacion, //modelo
  ControlImplementacionSchema, //, esquema
};
