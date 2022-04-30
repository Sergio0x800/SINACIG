const { Model, DataTypes } = require('sequelize');

const MATRIZ_TABLE = 'tt_matriz';

const MatrizSchema = {
  id_matriz: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  id_unidad_ejecutora: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },

  fecha_periodo_inicio: {
    allowNull: true,
    type: DataTypes.DATE,
  },
  fecha_periodo_fin: {
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

class Matriz extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: MATRIZ_TABLE,
      modelName: 'Matriz',
      timestamps: false,
    };
  }
}

module.exports = {
  Matriz, //modelo
  MatrizSchema, //, esquema
};
