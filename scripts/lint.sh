set -e
cd utils
npm run lint
cd ../test
npm run lint
cd ../core
npm run lint
cd ../tools
npm run lint
cd ../cli
npm run lint
cd ..
