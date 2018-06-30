#!/usr/bin/env bash
npm install
babel-node ./scripts/setup/exec.js
npm run build
