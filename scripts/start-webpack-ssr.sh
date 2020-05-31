#!/usr/bin/env bash
set -e
nvm-guard

export NODE_ENV=${NODE_ENV:=development}

echo "starting webpack for ssr..."

webpack --watch --config "./src/webpack/config/webpack.ssr.${NODE_ENV}.config.js"
