/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


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
      'Origin, X-Requested-With, Content-Type, Accept',
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

