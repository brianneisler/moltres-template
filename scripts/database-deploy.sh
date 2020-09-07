#!/usr/bin/env bash
set -e
export NODE_ENV=${NODE_ENV:=production}

echo "deploying database for ${STAGE}..."

# Backup the database before deploy the database changes
npm run database:backup

firebase deploy --only firestore:rules --project $FIREBASE_PROJECT_ID --token "$FIREBASE_TOKEN"

npm run database:migrate:up

npm run configure $STAGE

echo "deploy complete!"
