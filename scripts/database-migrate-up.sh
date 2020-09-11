#!/usr/bin/env bash
set -e
nvm-guard
echo "migrating up ${STAGE}..."

babel-node ./scripts/js/migrate-up.js $@

echo "database up migration complete!"
