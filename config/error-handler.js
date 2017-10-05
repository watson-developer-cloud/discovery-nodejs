module.exports = (app) => {
  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.code = 404;
    err.message = 'Not Found';
    next(err);
  });

  // error handler
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    const error = {
      code: err.code || 500,
      error: err.error || err.message,
    };
    res.status(error.code).json(error);
  });
};
