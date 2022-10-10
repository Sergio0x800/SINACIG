// const sequelize = require('../libs/sequelize');
const { models } = require('../libs/sequelize');
// const boom = require('@hapi/boom');

class MatrizcontinuidadService {
  constructor() {}

  async createMatrizcontinuidad(data) {
    const result = await models.MatrizContinuidad.create(data);
    return result.dataValues;
  }
}

module.exports = MatrizcontinuidadService;
