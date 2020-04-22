#!/usr/bin/env bash
set -e
export NODE_ENV=${NODE_ENV:=production}
export STAGE=${STAGE:=${1:-test}}

echo "deploying database for ${STAGE}..."

# Select the firebase app to deploy
firebase use ${STAGE}

# Backup the database before deploy the database changes
npm run database:backup

firebase deploy --only firestore:rules --token "$FIREBASE_TOKEN"

npm run database:migrate:up

npm run configure $STAGE

echo "deploy complete!"
