#!/usr/bin/env bash
set -e
nvm-guard

echo "linting..."

eslint . --fix --cache

echo "lint complete!"
