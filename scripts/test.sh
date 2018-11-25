#!/usr/bin/env bash
set -e
if [[ "$TRAVIS_PULL_REQUEST" == "false" && -n "$TRAVIS_TAG" ]]; then
  echo "Skipping tests since this is a tagged release"
else
  echo "Starting tests"
  babel-node ./scripts/js/test/exec.js "$@"
fi
