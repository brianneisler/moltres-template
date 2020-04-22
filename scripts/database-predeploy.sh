#!/usr/bin/env bash
set -e
echo "Running predeploy for database..."
firemin minimize -f ./firestore.rules -o ./firestore.min.rules
echo "Predeploy for database complete..."
