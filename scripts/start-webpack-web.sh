#!/usr/bin/env bash
set -e
nvm-guard

export NODE_ENV=${NODE_ENV:=development}

echo "starting webpack for web..."

webpack --watch --config "./src/webpack/config/webpack.${NODE_ENV}.config.js"
