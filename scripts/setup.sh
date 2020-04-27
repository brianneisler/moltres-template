#!/usr/bin/env bash
set -e

echo "setting up..."

npm install
firebase setup:emulators:database
firebase setup:emulators:firestore
firebase setup:emulators:pubsub
npm run database:predeploy

echo "setup complete!"
