#!/bin/bash

set -e

if [ "$TRAVIS_SECURE_ENV_VARS" == "true" ]; then
  npm test;
else
  echo "Discovery credentials not set up: not running integration tests.";
  npm run test-unit;
fi
