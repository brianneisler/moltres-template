set -e
cd saga
eslint . --cache
cd ../app
eslint . --cache
cd ../api
eslint . --cache
