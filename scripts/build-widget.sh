#!/usr/bin/env bash
set -e
nvm-guard

echo "building widget for ${STAGE}..."

# Build the widget app
webpack --config "./src/webpack/config/webpack.widget.${NODE_ENV}.config.js"

echo "building widget complete!"
