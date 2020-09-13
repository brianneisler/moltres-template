#!/usr/bin/env bash
set -e
nvm-guard

export NODE_ENV=${NODE_ENV:=production}

echo "deploying ${STAGE}..."

npm run clean

# Set the firebase config
DOTENV=$(cat "./stages/${STAGE}/.env")
firebase functions:config:set dot.env="$DOTENV" --project $FIREBASE_PROJECT_ID --token "$FIREBASE_TOKEN"

npm run build

# Backup the database before deploy the changes
npm run database:backup

echo "starting deploy for ${STAGE}..."
firebase deploy --project $FIREBASE_PROJECT_ID --token "$FIREBASE_TOKEN"

npm run database:migrate:up

npm run configure

echo "deploy complete!"
