#!/usr/bin/env bash
set -e
npm install
babel-node ./scripts/setup/exec.js
npm run build
