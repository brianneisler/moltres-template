#!/usr/bin/env bash
nvm-guard
if [ $? -eq 1 ]; then
  exit 1
fi

export NODE_ENV=development
# NOTE: We always export the stage in case there is something that goes wrong
export STAGE=${STAGE:=local}

echo "setting stage '${STAGE}'..."
firebase use ${STAGE}

if [ "$TEST_INTEGRATION" = "true" ]; then
  echo "running integration tests on '${STAGE}'"
  npm run test:run -- $@
else
  firebase emulators:exec "npm run test:run -- $@"
fi

if [ $? -eq 0 ]
then
  echo "Tests successful."
  exit 0
else
  echo "Tests failed." >&2
  exit 1
fi
