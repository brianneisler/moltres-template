#!/usr/bin/env bash
set -e
nvm-guard

export NODE_ENV=${NODE_ENV:=development}
export STAGE=${STAGE:=${1:-test}}

echo "starting web for ${STAGE}..."

expo start --web
