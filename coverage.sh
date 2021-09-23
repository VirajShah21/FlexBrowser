#!/usr/bin/env bash
rm -rf coverage
mkdir coverage
mkdir coverage/src


node_modules/.bin/jscover src coverage/src
JSCOV=1 npx mocha -R mocha-lcov-reporter --recursive > coverage/coverage.lcov
