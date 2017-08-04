const spawn = require('child_process').spawn;
const server = require('../server');

const client = spawn('./node_modules/.bin/react-scripts', ['start'], {
  env: Object.assign({}, process.env, {
    REACT_APP_SERVER: 'http://localhost:5000',
  }),
});
client.stdout.on('data', (data) => {
  // eslint-disable-next-line no-console
  console.log(`${data}`);
});

client.stderr.on('data', (data) => {
  // eslint-disable-next-line no-console
  console.log(`${data}`);
});

function killServer(callback) {
  const ppid = server.pid;
  const killer = spawn('pkill', ['-9', '-P', ppid]);

  killer.on('exit', () => {
    // eslint-disable-next-line no-console
    console.log(`PPID ${ppid} killed`);

    if (callback) {
      callback();
    }
  });
}

client.on('error', (error) => {
  // eslint-disable-next-line no-console
  console.log(`ERROR: ${error}`);
  killServer(() => {
    process.exit(1);
  });
});

client.on('close', () => {
  killServer(() => {
    process.exit(1);
  });
});
