// security.js
const secure = require('express-secure-only');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

module.exports = function secureApp(app) {
  app.use(secure());
  app.use(helmet());

  const limiter = rateLimit({
    windowMs: 30 * 1000, // seconds
    max: 5,
    message: JSON.stringify({
      error: 'Too many requests, please try again in 30 seconds.',
      code: 429,
    }),
  });
  app.use('/api/', limiter);
};
