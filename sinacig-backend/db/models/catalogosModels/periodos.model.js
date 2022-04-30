const { Model, DataTypes } = require('sequelize');

const PERIODOS_TABLE = 'ts_periodo';

const PeriodosSchema = {
  id_periodo: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  anio: {
    allowNull: true,
    type: DataTypes.NUMBER,
  },
  fecha_inicio: {
    allowNull: true,
    type: DataTypes.DATE,
  },
  fecha_fin: {
    allowNull: true,
    type: DataTypes.DATE,
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

class Periodos extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PERIODOS_TABLE,
      modelName: 'Periodos',
      timestamps: false,
    };
  }
}

module.exports = {
  Periodos, //modelo
  PeriodosSchema, //, esquema
};
