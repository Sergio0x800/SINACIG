function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
}

function logErrors(err, req, res, next) {
  console.error(err);
  res.status(500).json({
    message: 'Error en el servidor',
  });
}

module.exports = { logErrors, boomErrorHandler };
