#!/usr/bin/env bash
set -e
jest --expand --forceExit --detectOpenHandles $@
