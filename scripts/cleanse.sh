set -e
cd utils
npm run cleanse
cd ../test
npm run cleanse
cd ../core
npm run cleanse
cd ../tools
npm run cleanse
cd ../cli
npm run cleanse
cd ..
rm -rf node_modules
rm -f package-lock.json
