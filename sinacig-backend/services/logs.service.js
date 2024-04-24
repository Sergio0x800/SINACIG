const { models } = require('../libs/sequelize');
// const boom = require('@hapi/boom');

class LogService {
  constructor() {}

  async createLog(data) {
    try {
      const result = await models.Log.create(data);
      return result;
    } catch (error) {
      throw `${error}`;
    }
  }
}

module.exports = LogService;
