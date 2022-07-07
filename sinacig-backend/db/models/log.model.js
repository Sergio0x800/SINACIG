const { Model, DataTypes } = require('sequelize');

const LOG_TABLE = 'tt_log';

const LogSchema = {
  id_log: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  nombre_tabla: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  id_registro: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  antes: {
    allowNull: true,
    type: DataTypes.TEXT,
  },
  despues: {
    allowNull: true,
    type: DataTypes.TEXT,
  },
  id_usuario_modifico: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  fecha_modifico: {
    allowNull: true,
    type: DataTypes.DATE,
  },
};

class Log extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: LOG_TABLE,
      modelName: 'Log',
      timestamps: false,
    };
  }
}

module.exports = {
  Log, //modelo
  LogSchema, //, esquema
};
