#! /usr/bin/env node

require('dotenv').config({ silent: true });
const tracker = require('cf-deployment-tracker-client');

// Deployment tracking
if (!process.env.DEMO_DEPLOY) {
  tracker.track();
}

const server = require('./app');

const port = process.env.PORT || 5000;

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Server running on port: %d', port);
});

module.exports = server;
