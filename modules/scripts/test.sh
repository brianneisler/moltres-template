set -e
cd saga
jest .
cd ../app
jest .
cd ../api
jest .
cd ..
