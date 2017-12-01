#! /usr/bin/env node

require('dotenv').config({ silent: true });
const tracker = require('cf-deployment-tracker-client');
const path = require('path');

// Deployment tracking
if (!process.env.DEMO_DEPLOY) {
  tracker.track();
}

const server = require(path.join(__dirname, 'app'));

const port = process.env.PORT || 5000;

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Server running on port: %d', port);
});

module.exports = server;
