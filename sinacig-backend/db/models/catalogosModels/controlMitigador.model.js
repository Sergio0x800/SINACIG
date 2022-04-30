const { Model, DataTypes } = require('sequelize');

const CONTROL_MITIGADOR_TABLE = 'tc_control_mitigador';

const ControlMitigadorSchema = {
  id_control_mitigador: {
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

class ControlMitigador extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CONTROL_MITIGADOR_TABLE,
      modelName: 'ControlMitigador',
      timestamps: false,
    };
  }
}

module.exports = {
  ControlMitigador, //modelo
  ControlMitigadorSchema, //, esquema
};
