const { Model, DataTypes } = require('sequelize');

const SEVERIDAD_TABLE = 'tc_severidad';

const SeveridadSchema = {
  id_severidad: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  nivel_severidad: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  estado_registro: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
};

class Severidad extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SEVERIDAD_TABLE,
      modelName: 'Severidad',
      timestamps: false,
    };
  }
}

module.exports = {
  Severidad, //modelo
  SeveridadSchema, //, esquema
};
