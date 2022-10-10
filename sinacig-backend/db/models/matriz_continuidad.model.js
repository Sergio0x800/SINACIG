const { Model, DataTypes } = require('sequelize');

const MATRIZ_CONTINUIDAD = 'tt_riesgo_continuidad';

const MatrizContinuidadSchema = {
  id_riesgo_continuidad: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  id_riesgo: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  subtema: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  id_nivel_tolerancia: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  id_frecuencia_monitoreo: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  id_puesto_responsable: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  id_severidad: {
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

class MatrizContinuidad extends Model {
  static associate() {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: MATRIZ_CONTINUIDAD,
      modelName: 'MatrizContinuidad',
      timestamps: false,
    };
  }
}

module.exports = {
  MatrizContinuidad, //modelo
  MatrizContinuidadSchema, //, esquema
};
