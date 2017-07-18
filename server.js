#! /usr/bin/env node

require('dotenv').config({ silent: true });

// Deployment tracking
if (!process.env.DEMO_DEPLOY) {
  require('cf-deployment-tracker-client').track();
}

const server = require('./app');
const port = process.env.PORT || 3000;

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Server running on port: %d', port);
});
