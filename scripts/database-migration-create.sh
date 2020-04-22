#!/usr/bin/env bash
set -e

echo "creating a new migration script..."

babel-node ./scripts/js/migration-create.js $@

echo "database migration created!"
