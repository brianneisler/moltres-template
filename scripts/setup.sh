set -e
npm install
cd core
npm install
npm run build
cd ../cli
npm install
npm run build
cd ..
