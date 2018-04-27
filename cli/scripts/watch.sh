rm -rf dist
mkdir -p dist
babel -w src -d dist --source-maps --ignore "**/*.test.js"
