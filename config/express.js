// Module dependencies
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const security = require('./security');

module.exports = function newsApp(app) {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      // eslint-disable-next-line comma-dangle
      'Origin, X-Requested-With, Content-Type, Accept'
    );

    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  });
  app.enable('trust proxy');
  app.use(bodyParser.json({ limit: '1mb' }));
  app.use(bodyParser.urlencoded({ extended: false }));

  // Only loaded when running in Bluemix
  if (process.env.VCAP_APPLICATION) {
    security(app);
  }

  app.use(express.static(path.join(__dirname, '..', 'build')));
  app.use(morgan('dev'));
};
