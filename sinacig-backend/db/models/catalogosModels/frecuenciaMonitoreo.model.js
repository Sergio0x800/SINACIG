const { Model, DataTypes } = require('sequelize');

const FRECUENCIA_MONITOREO_TABLE = 'tc_frecuencia_monitoreo';

const FrecuenciaMonitoreoSchema = {
  id_frecuencia_monitoreo: {
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
};

class FrecuenciaMonitoreo extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: FRECUENCIA_MONITOREO_TABLE,
      modelName: 'FrecuenciaMonitoreo',
      timestamps: false,
    };
  }
}

module.exports = {
  FrecuenciaMonitoreo, //modelo
  FrecuenciaMonitoreoSchema, //, esquema
};
