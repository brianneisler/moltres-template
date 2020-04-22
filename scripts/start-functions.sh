#!/usr/bin/env bash
set -e
nvm-guard

export NODE_ENV=${NODE_ENV:=development}
export STAGE=${STAGE:=${1:-test}}

echo "starting functions for ${STAGE}..."

if [ "$STAGE" = "local" ]; then
  echo "running in local mode..."
  firebase use --clear
  # TODO BRN: Figure out how to configure the initial local database
  # npm run configure $STAGE
  firebase emulators:start -o 0.0.0.0 --debug
else
  # Select the firebase app to start
  firebase use ${STAGE}

  npm run configure $STAGE

  # NOTE: the -o option allows us to set the host. Setting to 0.0.0.0 listens to
  # all ips on the network so that you can test on a mobile device.
  # firebase serve
  firebase serve -o 0.0.0.0 --debug
fi
