set -e
cd saga
rm -rf ./node_modules
rm -f package-lock.json
cd ../app
rm -rf ./node_modules
rm -f package-lock.json
cd ../api
rm -rf ./node_modules
rm -f package-lock.json
cd ..
rm -rf ./node_modules
rm -f package-lock.json
