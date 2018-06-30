#!/usr/bin/env bash
#if [[ "$TRAVIS_PULL_REQUEST" == "false" && -n "$TRAVIS_TAG" ]]; then
  echo "Preparing to deploy project"
  node ./scripts/deploy/exec.js
#else
  echo "Skipping project deployment since it's not a tagged commit"
#fi
