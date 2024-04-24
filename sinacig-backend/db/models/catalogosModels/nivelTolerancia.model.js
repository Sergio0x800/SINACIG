const { Model, DataTypes } = require('sequelize');

const NIVEL_TOLERANCIA = 'tc_nivel_tolerancia';

const NivelToleranciaSchema = {
  id_nivel_tolerancia: {
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

class NivelTolerancia extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: NIVEL_TOLERANCIA,
      modelName: 'NivelTolerancia',
      timestamps: false,
    };
  }
}

module.exports = {
  NivelTolerancia, //modelo
  NivelToleranciaSchema, //, esquema
};
