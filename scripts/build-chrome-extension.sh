#!/usr/bin/env bash
set -e
nvm-guard

echo "building chrome-extension for ${STAGE}..."

# Build the chrome-extension app
webpack --config "./src/webpack/config/webpack.chrome-extension.${NODE_ENV}.config.js"

echo "building chrome-extension complete!"
