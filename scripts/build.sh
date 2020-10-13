#!/usr/bin/env bash
set -e
nvm-guard

echo "building all for ${STAGE}..."

concurrently --kill-others-on-fail "npm:build:ssr" "npm:build:web" "npm:build:functions"

echo "build all complete!"
