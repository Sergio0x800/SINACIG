const { Model, DataTypes } = require('sequelize');

const AREA_EVALUADA_TABLE = 'tc_area_evaluada';

const AreaEvaluadaSchema = {
  id_area_evaluada: {
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
  usuario_registro: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  fecha_registro: {
    allowNull: true,
    type: DataTypes.DATE,
  },
};

class AreaEvaluada extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: AREA_EVALUADA_TABLE,
      modelName: 'AreaEvaluada',
      timestamps: false,
    };
  }
}

module.exports = {
  AreaEvaluada, //modelo
  AreaEvaluadaSchema, //, esquema
};
