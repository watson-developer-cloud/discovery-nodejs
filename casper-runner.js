require('dotenv').config();
const { spawn } = require('child_process');
const app = require('./app');

if (!process.env.DISCOVERY_IAM_APIKEY) {
  // eslint-disable-next-line no-console
  console.log('Skipping integration tests because DISCOVERY_IAM_APIKEY is null');
} else {
  const port = 3000;
  const server = app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log('Server running on port: %d', port);

    function kill(code) {
      server.close(() => {
        // eslint-disable-next-line no-process-exit
        process.exit(code);
      });
    }

    function runTests() {
      const casper = spawn('npm', ['run', 'test-integration']);
      casper.stdout.pipe(process.stdout);

      casper.on('error', (error) => {
        // eslint-disable-next-line no-console
        console.log(`ERROR: ${error}`);
        server.close(() => {
          process.exit(1);
        });
      });

      casper.on('close', kill);
    }

    runTests();
  });
}
