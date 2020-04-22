#!/usr/bin/env bash
set -e
export NODE_ENV=${NODE_ENV:=production}
export STAGE=${STAGE:=${1}}

if [ -z "$STAGE" ]; then
  echo "STAGE must be specified"
  exit 1
fi

echo "initializing ${STAGE}..."

# TODO BRN: Make a new .env file for this stage
#
# TODO BRN: Figure out how to create a new database in firebase

npm run deploy $STAGE

echo "deploy complete!"
