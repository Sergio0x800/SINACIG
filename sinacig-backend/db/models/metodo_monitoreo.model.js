const { Model, DataTypes } = require('sequelize');

const MONITOREO_TABLE = 'tt_detalle_monitoreo';

const MonitoreoSchema = {
  id_detalle_monitoreo: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  id_riesgo_continuidad: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  descripcion_monitoreo: {
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

class Monitoreo extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: MONITOREO_TABLE,
      modelName: 'Monitoreo',
      timestamps: false,
    };
  }
}

module.exports = {
  Monitoreo, //modelo
  MonitoreoSchema, //, esquema
};
