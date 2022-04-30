const { Model, DataTypes } = require('sequelize');

const EVENTOS_TABLE = 'tc_eventos_identificados';

const EventosSchema = {
  id_eventos_identificados: {
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
  usuario_registro: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  fecha_registro: {
    allowNull: true,
    type: DataTypes.DATE,
  },
};

class Eventos extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: EVENTOS_TABLE,
      modelName: 'Eventos',
      timestamps: false,
    };
  }
}

module.exports = {
  Eventos, //modelo
  EventosSchema, //, esquema
};
