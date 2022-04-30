const { Model, DataTypes } = require('sequelize');

const RECURSOS_TABLE = 'tt_recursos';

const RecursosSchema = {
  id_recursos: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  id_riesgo_plan_trabajo: {
    allowNull: false,
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

class Recursos extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: RECURSOS_TABLE,
      modelName: 'Recursos',
      timestamps: false,
    };
  }
}

module.exports = {
  Recursos, //modelo
  RecursosSchema, //, esquema
};
