#!/usr/bin/env bash
set -e
nvm-guard

export NODE_ENV=${NODE_ENV:=development}

echo "starting webpack for chrome-extension..."

webpack --watch --mode development --config "./src/webpack/config/webpack.chrome-extension.${NODE_ENV}.config.js"
