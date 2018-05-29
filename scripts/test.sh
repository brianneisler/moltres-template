#!/usr/bin/env bash
if [[ "$TRAVIS_PULL_REQUEST" == "false" && -n "$TRAVIS_TAG" ]]; then
  echo "Skipping tests since this is a tagged release"
else
  echo "Starting tests"
  node ./scripts/test/exec.js
fi
