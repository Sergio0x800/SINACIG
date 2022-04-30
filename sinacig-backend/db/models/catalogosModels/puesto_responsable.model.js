const { Model, DataTypes } = require('sequelize');

const PUESTO_RESPONSABLE_TABLE = 'tc_puesto_responsable';

const PuestoResponsableSchema = {
  id_puesto_responsable: {
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

class PuestoResponsable extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PUESTO_RESPONSABLE_TABLE,
      modelName: 'PuestoResponsable',
      timestamps: false,
    };
  }
}

module.exports = {
  PuestoResponsable, //modelo
  PuestoResponsableSchema, //, esquema
};
