#!/usr/bin/env bash
set -e
nvm-guard

echo "building ssr for ${STAGE}..."

# Build the ssr app
webpack --config "./src/webpack/config/webpack.ssr.${NODE_ENV}.config.js"

echo "building ssr complete!"
