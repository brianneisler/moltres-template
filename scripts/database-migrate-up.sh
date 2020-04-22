#!/usr/bin/env bash
set -e
nvm-guard
export STAGE=${STAGE:=${1:-test}}
echo "migrating up ${STAGE}..."

babel-node ./scripts/js/migrate-up.js $@

echo "database up migration complete!"
