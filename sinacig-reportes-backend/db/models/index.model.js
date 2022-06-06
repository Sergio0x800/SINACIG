const { Unidad, UnidadSchema } = require('./catalogosModels/unidad.model');
const {
  ControlInterno,
  ControlInternoSchema,
} = require('./riesgo_control_interno.model');
function setupModels(sequelize) {
  Unidad.init(UnidadSchema, Unidad.config(sequelize));
  ControlInterno.init(ControlInternoSchema, ControlInterno.config(sequelize));
}

module.exports = setupModels;
