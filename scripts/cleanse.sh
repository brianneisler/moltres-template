#!/usr/bin/env bash
set -e
babel-node ./scripts/js/cleanse/exec.js "$@"
rm -rf node_modules
rm -f package-lock.json
