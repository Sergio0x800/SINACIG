const Joi = require('joi');

//crear_caso_forme_e1
const id_persona = Joi.number.integer();
const id_tipo_notificante = Joi.number.integer();
const nombre_notificante = Joi.string();
const telefono_notificante = Joi.number.integer();
const clave_notificante = Joi.number.integer().max(1);
const estado_caso = Joi.number.integer();
const fecha_inicio_sintoma = Joi.number.integer().max(1);
const embarazada = Joi.number.integer().max(1);
const no_semana = Joi.number.integer().max(1);
const no_caso = Joi.number.integer().max(1);
const medicamento_previo = Joi.number.integer().max(1);
const idas = Joi.number.integer().max(1);
const idds = Joi.number.integer().max(1);
const idts = Joi.number.integer().max(1);
const viajo = Joi.number.integer().max(1);
const id_personal_salud = Joi.number.integer().max(1);
const estado_registro = Joi.number.integer().max(1);
const id_usuario_registro = Joi.number.integer().max(1);

const createCasoMalariaSchema = Joi.object({
  id_ocupacion: id_ocupacion.required(),
  id_escolaridad: id_escolaridad.required(),
  id_discapacidad: id_discapacidad.required(),
  id_orientacion_sexual: id_orientacion_sexual.required(),
  asintomatico: asintomatico.require(),
  id_usuario_ingreso: id_usuario_ingreso.require(),
  estado_registro: estado_registro.require(),
});

module.exports = { createPersonaMalariaSchema };
