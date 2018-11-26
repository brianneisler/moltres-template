#!/usr/bin/env bash
set -e
npm run setup
npm run predeploy
babel-node ./scripts/js/deploy/exec.js
