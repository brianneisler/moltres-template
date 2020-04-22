#!/usr/bin/env bash
set -e

echo "setting up..."

npm install
firebase setup:emulators:firestore
npm run database:predeploy

echo "setup complete!"
