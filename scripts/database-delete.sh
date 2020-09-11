#!/usr/bin/env bash
set -e
export NODE_ENV=${NODE_ENV:=development}

echo "deleting database for '${STAGE}'..."

firebase firestore:delete --project $FIREBASE_PROJECT_ID --token $FIREBASE_TOKEN --all-collections -y

echo "database delete complete!"
