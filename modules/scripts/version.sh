#!/usr/bin/env bash
set -e
babel-node ./scripts/js/version/exec.js $1
npm version $1 --no-git-tag-version
