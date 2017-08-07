const spawn = require('child_process').spawn;
const server = require('../server');

const client = spawn('./node_modules/.bin/react-scripts', ['start'], {
  env: Object.assign({}, process.env, {
    REACT_APP_SERVER: 'http://localhost:5000',
  }),
});

let runningAtMessage;

client.stdout.on('data', (data) => {
  if (data.indexOf('Starting the development server') >= 0) {
    // eslint-disable-next-line no-console
    console.log('\x1Bc');
  }

  if (data.indexOf('You can now view') >= 0) {
    runningAtMessage = data.toString('utf8');
  }

  if (data.indexOf('Compiling') >= 0) {
    // eslint-disable-next-line no-console
    console.log('\x1Bc');
  }

  if (data.indexOf('Compiled successfully!') >= 0 && runningAtMessage) {
    // eslint-disable-next-line no-console
    console.log('\x1Bc');
    // eslint-disable-next-line no-console
    console.log(`${data}`);
    // eslint-disable-next-line no-console
    console.log(runningAtMessage);
  } else {
    // eslint-disable-next-line no-console
    console.log(`${data}`);
  }
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
