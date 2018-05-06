#!/usr/bin/env bash

if [[ "$TRAVIS_PULL_REQUEST" == "false" && -n "$TRAVIS_TAG" ]]; then
  echo "Preparing to deploy project"
  cd utils
  npm run predeploy
  npm publish
  cd ../test
  npm run predeploy
  npm publish
  cd ../core
  npm run predeploy
  npm publish
  cd ../tools
  npm run predeploy
  npm publish
  cd ../cli
  npm run predeploy
  npm publish
else
  echo "Skipping project deployment since it's not a tagged commit"
fi
