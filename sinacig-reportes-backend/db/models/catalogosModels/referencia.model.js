const { Model, DataTypes } = require('sequelize');

const REFERENCIA_TABLE = 'tc_referencia';

const ReferenciaSchema = {
  id_referencia: {
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

class Referencia extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: REFERENCIA_TABLE,
      modelName: 'Referencia',
      timestamps: false,
    };
  }
}

module.exports = {
  Referencia, //modelo
  ReferenciaSchema, //, esquema
};
