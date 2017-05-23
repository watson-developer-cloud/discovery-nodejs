#!/usr/bin/bash

set -e

if [ "$TRAVIS_SECURE_ENV_VARS" == "true" ]; then
  npm run test-unit;
else
  echo "Building on fork: not running integration tests.";
  npm test;
fi
