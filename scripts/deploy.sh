#!/usr/bin/env bash
if [[ "$TRAVIS_PULL_REQUEST" == "false" && -n "$TRAVIS_TAG" ]]; then
  if [[ "$TRAVIS_NODE_VERSION" == "8" ]]; then
    echo "Preparing to deploy project"
    node ./scripts/deploy/exec.js
  else
    echo "Skipping project deployment since it's not a node 8"
  fi
else
  echo "Skipping project deployment since it's not a tagged commit"
fi
