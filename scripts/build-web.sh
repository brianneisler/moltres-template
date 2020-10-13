#!/usr/bin/env bash
set -e
nvm-guard

echo "building web for ${STAGE}..."

# Build the web app
webpack --config "./src/webpack/config/webpack.${NODE_ENV}.config.js"

echo "building web complete!"
