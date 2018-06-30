#!/usr/bin/env bash
set -e
if [[ "$TRAVIS_PULL_REQUEST" == "false" && -n "$TRAVIS_TAG" ]]; then
  echo "Skipping lint since this is a tagged release"
else
  echo "Starting lint"
  babel-node ./scripts/lint/exec.js
fi
