#!/usr/bin/env bash
set -e
npm version $1
babel-node ./scripts/version/exec.js $1
