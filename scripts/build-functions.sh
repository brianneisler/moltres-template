#!/usr/bin/env bash
set -e
nvm-guard

echo "building functions for ${STAGE}..."

# Build the production dist folder
mkdir -p dist
rsync -avz --exclude='*.js' --exclude='*.snap' --exclude='__tests__' --exclude='node_modules' src/ dist/
babel src -d dist --source-maps --ignore "**/*.test.js" --ignore "**/__mocks__" --ignore "**/__snapshots__" --ignore "**/__tests__"

echo "building functions complete!"

