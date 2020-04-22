#!/usr/bin/env bash
set -e
export NODE_ENV=${NODE_ENV:=development}
export STAGE=${STAGE:=${1:test}}

echo "configuring ${STAGE}..."

# Select the firebase app to deploy
firebase use ${STAGE}

babel-node ./scripts/js/configure.js

echo "configure complete!"
