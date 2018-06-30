#!/usr/bin/env bash
set -e
babel-node ./scripts/cleanse/exec.js
npm run clean
rm -rf node_modules
rm -f package-lock.json
