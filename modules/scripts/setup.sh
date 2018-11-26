#!/usr/bin/env bash
set -e
npm install
babel-node ./scripts/js/setup/exec.js
npm run build
