set -e
cd utils
npm run build
cd ../test
npm run build
cd ../core
npm run build
cd ../tools
npm run build
cd ../cli
npm run build
cd ..
