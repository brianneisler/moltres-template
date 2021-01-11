#!/usr/bin/env bash
set -e
nvm-guard

export NODE_ENV=${NODE_ENV:=development}

echo "starting webpack for widget..."

webpack --watch --config "./src/webpack/config/webpack.widget.${NODE_ENV}.config.js"
