#!/usr/bin/env bash
set -e
export NODE_ENV=${NODE_ENV:=development}
export STAGE=${STAGE:=${1:-test}}

echo "running database backup script for '${STAGE}'..."
# babel-node scripts/js/get-stage-config.js "${STAGE}" "GCLOUD_DATABASE_BACKUP_BUCKET"

PROJECT_ID=$(node scripts/js/stage-to-project.js "${STAGE}")
GCLOUD_DATABASE_BACKUP_BUCKET=$(babel-node scripts/js/get-stage-config.js "${STAGE}" "GCLOUD_DATABASE_BACKUP_BUCKET")

if [ -z "$GCLOUD_DATABASE_BACKUP_BUCKET" ]; then
  echo "No databack backup bucket defined, skipping backup..."
else
  echo "backing up ${PROJECT_ID} to ${GCLOUD_DATABASE_BACKUP_BUCKET}"
  # gcloud config set project $PROJECT_ID
  # gcloud beta firestore export "gs://${GCLOUD_DATABASE_BACKUP_BUCKET}"

  babel-node ./scripts/js/database-backup.js $@
  echo "database backup complete!"
fi

