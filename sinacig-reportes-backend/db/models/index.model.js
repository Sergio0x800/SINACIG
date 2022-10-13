const { Unidad, UnidadSchema } = require('./catalogosModels/unidad.model');
const { Recursos, RecursosSchema } = require('./recurso.model');
const { Monitoreo, MonitoreoSchema } = require('./metodo_monitoreo.model');
const {
  ControlInterno,
  ControlInternoSchema,
} = require('./riesgo_control_interno.model');
function setupModels(sequelize) {
  Unidad.init(UnidadSchema, Unidad.config(sequelize));
  ControlInterno.init(ControlInternoSchema, ControlInterno.config(sequelize));
  Recursos.init(RecursosSchema, Recursos.config(sequelize));
  Monitoreo.init(MonitoreoSchema, Monitoreo.config(sequelize));
}

module.exports = setupModels;
