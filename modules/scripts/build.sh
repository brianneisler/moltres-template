set -e
cd saga
mkdir -p dist
babel src -d dist --source-maps --ignore "**/*.test.js"
rsync -avz --exclude *.js --exclude __tests__ --exclude node_modules src/ dist/
cd ../app
mkdir -p dist
babel src -d dist --source-maps --ignore "**/*.test.js"
rsync -avz --exclude *.js --exclude __tests__ --exclude node_modules src/ dist/
cd ../api
mkdir -p dist
babel src -d dist --source-maps --ignore "**/*.test.js"
rsync -avz --exclude *.js --exclude __tests__ --exclude node_modules src/ dist/
cd ..
