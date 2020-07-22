#!/usr/bin/env bash
set -e
export NODE_ENV=${NODE_ENV:=production}
export STAGE=${STAGE:=${1:-test}}

echo "building ${STAGE}..."

# Config workaround
babel-node ./scripts/js/build.js

# Build the production dist folder
mkdir -p dist
rsync -avz --exclude='*.js' --exclude='*.snap' --exclude='__tests__' --exclude='node_modules' src/ dist/
babel src -d dist --source-maps --ignore "**/*.test.js" --ignore "**/__mocks__" --ignore "**/__snapshots__" --ignore "**/__tests__"

echo "building ${NODE_ENV} webpack bundle..."
# Build the web app
webpack --config "./src/webpack/config/webpack.${NODE_ENV}.config.js"

# Build the ssr app
webpack --config "./src/webpack/config/webpack.ssr.${NODE_ENV}.config.js"

echo "build complete!"
