#!/usr/bin/env bash
npm run setup
npm run predeploy
node ./scripts/deploy/exec.js
