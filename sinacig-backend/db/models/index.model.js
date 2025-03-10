const { Unidad, UnidadSchema } = require('./catalogosModels/unidad.model');
const {
  FrecuenciaMonitoreo,
  FrecuenciaMonitoreoSchema,
} = require('./catalogosModels/frecuenciaMonitoreo.model');
const {
  NivelTolerancia,
  NivelToleranciaSchema,
} = require('./catalogosModels/nivelTolerancia.model');
const {
  TipoObjetivo,
  TipoObjetivoSchema,
} = require('./catalogosModels/tipoObjetivos.model');
const { Log, LogSchema } = require('./log.model');
const {
  Periodos,
  PeriodosSchema,
} = require('./catalogosModels/periodos.model');
const {
  Severidad,
  SeveridadSchema,
} = require('./catalogosModels/severidad.model');
const {
  AreaEvaluada,
  AreaEvaluadaSchema,
} = require('./catalogosModels/areaEvaluada.model');
const {
  Probabilidad,
  ProbabilidadSchema,
} = require('./catalogosModels/probabilidad.model');
const { Rol, RolSchema } = require('./catalogosModels/rol.model');
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
  MatrizContinuidad,
  MatrizContinuidadSchema,
} = require('./matriz_continuidad.model');
const { Monitoreo, MonitoreoSchema } = require('./metodo_monitoreo.model');
const {
  ControlInterno,
  ControlInternoSchema,
} = require('./riesgo_control_interno.model');
const { Recursos, RecursosSchema } = require('./recurso.model');
const {
  ControlInternoPlan,
  ControlInternoPlanSchema,
} = require('./plan_control_interno.model');

const {
  ControlImplementacion,
  ControlImplementacionSchema,
} = require('./riesgo_control_implementacion.model');
const { Matriz, MatrizSchema } = require('./matriz.model');
const { Correlativo, CorrelativoSchema } = require('./correlativo.model');
const {
  ControlMitigador,
  ControlMitigadorSchema,
} = require('./catalogosModels/controlMitigador.model');
const { Usuario, UsuarioSchema } = require('./usuario.model');

function setupModels(sequelize) {
  Unidad.init(UnidadSchema, Unidad.config(sequelize));
  FrecuenciaMonitoreo.init(
    FrecuenciaMonitoreoSchema,
    FrecuenciaMonitoreo.config(sequelize)
  );
  NivelTolerancia.init(
    NivelToleranciaSchema,
    NivelTolerancia.config(sequelize)
  );
  TipoObjetivo.init(TipoObjetivoSchema, TipoObjetivo.config(sequelize));
  Severidad.init(SeveridadSchema, Severidad.config(sequelize));
  AreaEvaluada.init(AreaEvaluadaSchema, AreaEvaluada.config(sequelize));
  Probabilidad.init(ProbabilidadSchema, Probabilidad.config(sequelize));
  Medida.init(MedidaRiesgoSchema, Medida.config(sequelize));
  Riesgo.init(RiesgoSchema, Riesgo.config(sequelize));
  PlanTrabajo.init(PlanTrabajoSchema, PlanTrabajo.config(sequelize));
  MatrizContinuidad.init(
    MatrizContinuidadSchema,
    MatrizContinuidad.config(sequelize)
  );
  Monitoreo.init(MonitoreoSchema, Monitoreo.config(sequelize));
  Prioridad.init(PrioridadSchema, Prioridad.config(sequelize));
  Periodos.init(PeriodosSchema, Periodos.config(sequelize));
  Rol.init(RolSchema, Rol.config(sequelize));
  ControlMitigador.init(
    ControlMitigadorSchema,
    ControlMitigador.config(sequelize)
  );
  ControlInterno.init(ControlInternoSchema, ControlInterno.config(sequelize));
  Recursos.init(RecursosSchema, Recursos.config(sequelize));
  ControlInternoPlan.init(
    ControlInternoPlanSchema,
    ControlInternoPlan.config(sequelize)
  );
  ControlImplementacion.init(
    ControlImplementacionSchema,
    ControlImplementacion.config(sequelize)
  );
  PuestoResponsable.init(
    PuestoResponsableSchema,
    PuestoResponsable.config(sequelize)
  );
  Matriz.init(MatrizSchema, Matriz.config(sequelize));
  Correlativo.init(CorrelativoSchema, Correlativo.config(sequelize));
  Usuario.init(UsuarioSchema, Usuario.config(sequelize));
  Log.init(LogSchema, Log.config(sequelize));
}

module.exports = setupModels;
