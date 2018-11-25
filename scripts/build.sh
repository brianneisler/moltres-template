#!/usr/bin/env bash
set -e
echo "Starting build"
babel-node ./scripts/js/build/exec.js "$@"
