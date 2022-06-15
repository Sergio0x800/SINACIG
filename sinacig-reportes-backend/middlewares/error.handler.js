function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: 'Error en el servidor',
  });
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    console.log(err.isBoom);
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
}

function logErrors(err, req, res, next) {
  console.error(err);
  next(err);
}

module.exports = { logErrors, boomErrorHandler, errorHandler };
