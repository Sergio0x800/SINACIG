const { Unidad, UnidadSchema } = require('./catalogosModels/unidad.model');
const {
  TipoObjetivo,
  TipoObjetivoSchema,
} = require('./catalogosModels/tipoObjetivos.model');
const {
  Severidad,
  SeveridadSchema,
} = require('./catalogosModels/severidad.model');
// const {
//   Referencia,
//   ReferenciaSchema,
// } = require('./catalogosModels/referencia.model');
const {
  AreaEvaluada,
  AreaEvaluadaSchema,
} = require('./catalogosModels/areaEvaluada.model');
const { Eventos, EventosSchema } = require('./catalogosModels/eventos.model');
const {
  Probabilidad,
  ProbabilidadSchema,
} = require('./catalogosModels/probabilidad.model');
const {
  Medida,
  MedidaRiesgoSchema,
} = require('./catalogosModels/medidaRiesgo.model');
const {
  PuestoResponsable,
  PuestoResponsableSchema,
} = require('./catalogosModels/puesto_responsable.model');
const {
  Prioridad,
  PrioridadSchema,
} = require('./catalogosModels/prioridad.model');
const { Riesgo, RiesgoSchema } = require('./riesgo.model');
const {
  PlanTrabajo,
  PlanTrabajoSchema,
} = require('./riesgo_plan_trabajo.model');
const {
  ControlInterno,
  ControlInternoSchema,
} = require('./riesgo_control_interno.model');
const { Recursos, RecursosSchema } = require('./recurso.model');
const {
  ControlImplementacion,
  ControlImplementacionSchema,
} = require('./riesgo_control_implementacion.model');

function setupModels(sequelize) {
  Unidad.init(UnidadSchema, Unidad.config(sequelize));
  TipoObjetivo.init(TipoObjetivoSchema, TipoObjetivo.config(sequelize));
  Severidad.init(SeveridadSchema, Severidad.config(sequelize));
  AreaEvaluada.init(AreaEvaluadaSchema, AreaEvaluada.config(sequelize));
  Eventos.init(EventosSchema, Eventos.config(sequelize));
  Probabilidad.init(ProbabilidadSchema, Probabilidad.config(sequelize));
  Medida.init(MedidaRiesgoSchema, Medida.config(sequelize));
  Riesgo.init(RiesgoSchema, Riesgo.config(sequelize));
  PlanTrabajo.init(PlanTrabajoSchema, PlanTrabajo.config(sequelize));
  Prioridad.init(PrioridadSchema, Prioridad.config(sequelize));
  ControlInterno.init(ControlInternoSchema, ControlInterno.config(sequelize));
  Recursos.init(RecursosSchema, Recursos.config(sequelize));
  ControlImplementacion.init(
    ControlImplementacionSchema,
    ControlImplementacion.config(sequelize)
  );
  PuestoResponsable.init(
    PuestoResponsableSchema,
    PuestoResponsable.config(sequelize)
  );
}

module.exports = setupModels;
