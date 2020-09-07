#!/usr/bin/env bash
set -e

echo "running database backup script for '${STAGE}'..."

if [ -z "$GCLOUD_DATABASE_BACKUP_BUCKET" ]; then
  echo "No databack backup bucket defined, skipping backup..."
else
  echo "backing up ${FIREBASE_PROJECT_ID} to ${GCLOUD_DATABASE_BACKUP_BUCKET}"
  # gcloud config set project $PROJECT_ID
  # gcloud beta firestore export "gs://${GCLOUD_DATABASE_BACKUP_BUCKET}"

  babel-node ./scripts/js/database-backup.js $@
  echo "database backup complete!"
fi

