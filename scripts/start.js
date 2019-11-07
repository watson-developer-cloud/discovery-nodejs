const spawn = require('cross-spawn');
const server = require('../server');

const client = spawn('./node_modules/react-scripts/bin/react-scripts.js', ['start'], {
  env: { ...process.env, REACT_APP_SERVER: 'http://localhost:5000' },
  stdio: 'inherit',
});

client.on('error', (error) => {
  // eslint-disable-next-line no-console
  console.log(`ERROR: ${error}`);
  server.close();
});

client.on('close', () => {
  server.close();
});
