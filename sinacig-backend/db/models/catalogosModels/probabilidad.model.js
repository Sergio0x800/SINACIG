const { Model, DataTypes } = require('sequelize');

const PROBABILIDAD_TABLE = 'tc_probabilidad';

const ProbabilidadSchema = {
  id_probabilidad: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  nivel_probabilidad: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  estado_registro: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
};

class Probabilidad extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PROBABILIDAD_TABLE,
      modelName: 'Probabilidad',
      timestamps: false,
    };
  }
}

module.exports = {
  Probabilidad, //modelo
  ProbabilidadSchema, //, esquema
};
