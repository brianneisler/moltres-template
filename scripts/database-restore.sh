#!/usr/bin/env bash
set -e
export NODE_ENV=${NODE_ENV:=development}
export STAGE=${STAGE:=${1:-test}}

echo "restoring database for '${STAGE}'..."

# babel-node scripts/js/get-stage-config.js "${STAGE}" "GCLOUD_DATABASE_BACKUP_BUCKET"

PROJECT_ID=$(node scripts/js/stage-to-project.js "${STAGE}")
GCLOUD_DATABASE_BACKUP_BUCKET=$(babel-node scripts/js/get-stage-config.js "${STAGE}" "GCLOUD_DATABASE_BACKUP_BUCKET")

echo "restorting ${PROJECT_ID} from ${GCLOUD_DATABASE_BACKUP_BUCKET}/${2}"
gcloud config set project $PROJECT_ID
gcloud beta firestore import "gs://${GCLOUD_DATABASE_BACKUP_BUCKET}/${2}"

echo "database restore complete!"
