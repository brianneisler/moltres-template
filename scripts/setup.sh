set -e
npm install
cd utils
npm install
npm run build
cd ../test
npm install
npm run build
cd ../core
npm install
npm run build
cd ../tools
npm install
npm run build
cd ../cli
npm install
npm run build
cd ..
