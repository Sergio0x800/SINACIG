const Joi = require('joi');

//TT_PERSONA
/*
const ID_NACIONALIDAD = Joi.number().integer;
const ID_TIPO_DOC_IDENTIFICACION = Joi.number().integer;
const CUI = Joi.number().integer.min(13).max(13);
const NO_IDENTIFICACION = Joi.string.min(13).max(20);
const PRIMER_NOMBRE = Joi.string.max();
const SEGUNDO_NOMBRE = Joi.string.max();
const TERCER_NOMBRE = Joi.string.max();
const PRIMER_APELLIDO = Joi.string.max();
const SEGUNDO_APELLIDO = Joi.string.max();
const FECHA_NACIMIENTO = Joi.number().integer;
const TELEFONO = Joi.number().integer;
const EMAIL = Joi.number().integer;
const DIRECCION = Joi.number().integer;
const ID_SEXO = Joi.number().integer;
const ID_ESTADO_CIVIL = Joi.number().integer;
const ID_PUEBLO = Joi.number().integer;
const ID_COMUNIDAD_LINGUISTICA = Joi.number().integer;
const ID_DEPARTAMENTO_RESIDENCIA = Joi.number().integer;
const ID_MUNICIPIO_RESIDENCIA = Joi.number().integer;
const ID_LP_RESIDENCIA = Joi.number().integer;
const FECHA_DEFUNCION = Joi.number().integer;
const ID_USUARIO_DEFUNCION = Joi.number().integer;
const FECHA_INGRESO_DEFUNCION = Joi.number().integer;
const ESTADO_REGISTRO = Joi.number().integer;
const ID_USUARIO_INGRESO = Joi.number().integer;
const FECHA_INSERT = Joi.number().integer;
const CUI_RESPONSABLE = Joi.number().integer;
const EDAD = Joi.number().integer;*/

//crear_persona_malaria
const id_ocupacion = Joi.number().integer();
const id_escolaridad = Joi.number.integer();
const id_discapacidad = Joi.number.integer();
const id_orientacion_sexual = Joi.number.integer();
const asintomatico = Joi.number.integer().max(1);
const id_usuario_ingreso = Joi.number.integer();
const estado_registro = Joi.number.integer().max(1);

const createPersonaMalariaSchema = Joi.object({
  id_ocupacion: id_ocupacion.required(),
  id_escolaridad: id_escolaridad.required(),
  id_discapacidad: id_discapacidad.required(),
  id_orientacion_sexual: id_orientacion_sexual.required(),
  asintomatico: asintomatico.require(),
  id_usuario_ingreso: id_usuario_ingreso.require(),
  estado_registro: estado_registro.require(),
});

module.exports = { createPersonaMalariaSchema };
