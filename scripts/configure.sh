#!/usr/bin/env bash
set -e
export NODE_ENV=${NODE_ENV:=development}

echo "configuring ${STAGE}..."

babel-node ./scripts/js/configure.js

echo "configure complete!"
