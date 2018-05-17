set -e
echo "Preparing moltres-tools for deployment..."
printf "//registry.npmjs.org/:_authToken=$NPM_TOKEN\nemail=$NPM_EMAIL" > .npmrc
