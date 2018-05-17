set -e
echo "Preparing moltres-test for deployment..."
printf "//registry.npmjs.org/:_authToken=$NPM_TOKEN\nemail=$NPM_EMAIL" > .npmrc
