#!/usr/bin/env bash
nvm-guard
if [ $? -eq 1 ]; then
  exit 1
fi

export NODE_ENV=development
export EMULATOR="cloud-firestore-emulator"
export EMULATOR_TARGET=$(find ~/.cache/firebase/emulators/ -type f -name "$EMULATOR*.jar" | sort -r | head -n1)

# I've found that the java process is not always killed properly,
# causing issues on subsequent runs... so let's clean things up when we're done (or have errored)
killEmulatorPid()
{
  for pid in `pgrep -f "$EMULATOR"` ; do kill $pid ; done
}
echo $(pwd)
# NOTE: We always export the stage in case there is something that goes wrong
export STAGE=${STAGE:=local}
if [ "$TEST_INTEGRATION" = "true" ]; then
  echo "testing ${STAGE}..."
  firebase use ${STAGE}
else
  firebase use --clear
  export FIRESTORE_EMULATOR_HOST="localhost:8080"
  if [ -z "$EMULATOR_TARGET" ]; then
    echo "Could not find the firestore emulator. Ending test run."
    exit 1
  fi
  if nc -z localhost 8080; then
    echo "Emulator already running, skipping starting the emulator"
  else
    # java -jar "$EMULATOR_TARGET" --host=127.0.0.1 --port=8080 > /dev/null 2> firestore-emulator.log &
    firebase emulators:start --only firestore > firestore-emulator.log 2> firestore-debug.log &
    RETRIES=0
    RETRY_LIMIT=10

    while [ $RETRIES -lt $RETRY_LIMIT ]; do
      sleep 1
      echo "Pinging firestore emulator"

      if nc -z localhost 8080; then
        break
      fi

      let RETRIES+=1

      if [ $RETRIES -ge $RETRY_LIMIT ]; then
        echo "Could not find the firestore emulator. Ending test run."
        killEmulatorPid
        exit 1
      fi
    done
  fi
fi

jest --expand $@

if [ $? -eq 0 ]
then
  echo "Tests successful. Cleaning up the firestore emulator."
  if [ "$TEST_INTEGRATION" != "true" ]; then
    killEmulatorPid
  fi
  echo "test complete!"
  exit 0
else
  echo "Tests failed. Cleaning up the firestore emulator." >&2
  if [ "$TEST_INTEGRATION" != "true" ]; then
    killEmulatorPid
  fi
  exit 1
fi
