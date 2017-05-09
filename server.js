#! /usr/bin/env node

require('dotenv').config({ silent: true });

// Deployment tracking
require('cf-deployment-tracker-client').track();

const server = require('./app');
const port = process.env.PORT || 3000;

server.then((newsApp) => {
  newsApp.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log('Server running on port: %d', port);
  });
});
