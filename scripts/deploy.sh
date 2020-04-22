#!/usr/bin/env bash
set -e
nvm-guard

export NODE_ENV=${NODE_ENV:=production}
export STAGE=${STAGE:=${1:-test}}

echo "deploying ${STAGE}..."

npm run clean

# Select the firebase app to deploy
firebase use ${STAGE}

# Set the firebase config
DOTENV=$(cat .env-${STAGE})
firebase functions:config:set dot.env="$DOTENV"

npm run build

# Backup the database before deploy the changes
npm run database:backup

firebase deploy --token "$FIREBASE_TOKEN"

npm run database:migrate:up

npm run configure $STAGE

echo "deploy complete!"
