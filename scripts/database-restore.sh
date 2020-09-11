#!/usr/bin/env bash
set -e

echo "restoring database for '${STAGE}'..."

echo "restorting ${FIREBASE_PROJECT_ID} from ${GCLOUD_DATABASE_BACKUP_BUCKET}/${2}"
gcloud config set project $FIREBASE_PROJECT_ID
gcloud beta firestore import "gs://${GCLOUD_DATABASE_BACKUP_BUCKET}/${2}"

echo "database restore complete!"
