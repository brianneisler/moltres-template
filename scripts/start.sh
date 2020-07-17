#!/usr/bin/env bash
set -e
nvm-guard

export NODE_ENV=${NODE_ENV:=development}
export STAGE=${STAGE:=${1:-local}}

echo "starting ${STAGE}..."

concurrently -k "npm:start:webpack:ssr" "npm:start:webpack:web" "npm:start:functions" "npm:start:web"
