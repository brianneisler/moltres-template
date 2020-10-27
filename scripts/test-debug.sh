#!/usr/bin/env bash
nvm-guard
if [ $? -eq 1 ]; then
  exit 1
fi

export NODE_ENV=development

if [ "$TEST_INTEGRATION" = "true" ]; then
  echo "running integration tests on '${STAGE}'"
  firebase use "${STAGE}" --token "${FIREBASE_TOKEN}"
  npm run test:run:debug -- $@
else
  firebase emulators:exec --project local --token "${FIREBASE_TOKEN}" "npm run test:run:debug -- $@"
fi

if [ $? -eq 0 ]
then
  echo "Tests successful."
  exit 0
else
  echo "Tests failed." >&2
  exit 1
fi
