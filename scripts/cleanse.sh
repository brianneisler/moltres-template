set -e
npm run clean
cd core
npm run cleanse
cd ../cli
npm run cleanse
cd ..
rm -rf node_modules
rm -f package-lock.json
