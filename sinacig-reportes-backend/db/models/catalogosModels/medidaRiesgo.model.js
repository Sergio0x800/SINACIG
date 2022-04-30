const { Model, DataTypes } = require('sequelize');

const MEDIDA_RIESGO_TABLE = 'tc_medida_riesgo';

const MedidaRiesgoSchema = {
  id_medida_riesgo: {
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
  rango_minimo: {
    allowNull: true,
    type: DataTypes.DECIMAL,
  },
  rango_maximo: {
    allowNull: true,
    type: DataTypes.DECIMAL,
  },
  color: {
    allowNull: true,
    type: DataTypes.STRING,
  },
};

class Medida extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: MEDIDA_RIESGO_TABLE,
      modelName: 'Medida',
      timestamps: false,
    };
  }
}

module.exports = {
  Medida, //modelo
  MedidaRiesgoSchema, //, esquema
};
