#!/usr/bin/env bash
set -e
babel-node ./scripts/version/exec.js $1
npm version $1
