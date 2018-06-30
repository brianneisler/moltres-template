#!/usr/bin/env bash
npm install
if [[ "$TRAVIS_PULL_REQUEST" == "false" && -n "$TRAVIS_TAG" ]]; then
  echo "Skipping rest of setup since this is a tagged release"
else
  echo "Starting setup"
  babel-node ./scripts/setup/exec.js
fi
