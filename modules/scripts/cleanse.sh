set -e
rm -rf ./node_modules
rm -f package-lock.json
../cli/bin/moltres cleanse --path ..
