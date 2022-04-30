const { Model, DataTypes } = require('sequelize');

const PLAN_TRABAJO_TABLE = 'tt_riesgo_plan_trabajo';

const PlanTrabajoSchema = {
  id_riesgo_plan_trabajo: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  id_riesgo: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  id_prioridad: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  id_puesto_responsable: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  fecha_inicio: {
    allowNull: true,
    type: DataTypes.DATEONLY,
  },
  fecha_fin: {
    allowNull: true,
    type: DataTypes.DATEONLY,
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
  comentario: {
    allowNull: true,
    type: DataTypes.STRING,
  },
};

class PlanTrabajo extends Model {
  static associate() {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: PLAN_TRABAJO_TABLE,
      modelName: 'PlanTrabajo',
      timestamps: false,
    };
  }
}

module.exports = {
  PlanTrabajo, //modelo
  PlanTrabajoSchema, //, esquema
};
