const express = require('express');
const router = express.Router();
const LogService = require('../services/logs.service');

const logService = new LogService();

router.post('/', async (req, res, next) => {
  try {
    const data = req.body;
    const result = await logService.createLog(data);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
