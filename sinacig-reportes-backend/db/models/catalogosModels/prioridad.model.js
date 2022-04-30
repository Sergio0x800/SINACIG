const { Model, DataTypes } = require('sequelize');

const PRIORIDAD_TABLE = 'tc_prioridad';

const PrioridadSchema = {
  id_prioridad: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  descripcion_prioridad: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  comentarios: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  estado_registro: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
};

class Prioridad extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRIORIDAD_TABLE,
      modelName: 'Prioridad',
      timestamps: false,
    };
  }
}

module.exports = {
  Prioridad, //modelo
  PrioridadSchema, //, esquema
};
