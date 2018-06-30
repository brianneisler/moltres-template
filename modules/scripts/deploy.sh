#!/usr/bin/env bash
npm run setup
npm run predeploy
babel-node ./scripts/deploy/exec.js
