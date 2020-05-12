#!/usr/bin/env bash
set -e
npm run test -- --collectCoverage
codecov
