#!/usr/bin/env bash
set -e
export NODE_ENV=${NODE_ENV:=development}
export STAGE=${STAGE:=${1:-test}}

echo "deleting database for '${STAGE}'..."

firebase use ${STAGE}
firebase firestore:delete --all-collections -y

echo "database delete complete!"
