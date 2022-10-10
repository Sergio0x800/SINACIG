// const sequelize = require('../libs/sequelize');
const { models } = require('../libs/sequelize');
// const boom = require('@hapi/boom');

class MonitoreoService {
  constructor() {}

  async createMetodoMonitoreo(data) {
    const result = await models.Monitoreo.create(data);
    return result.dataValues;
  }
}

module.exports = MonitoreoService;
