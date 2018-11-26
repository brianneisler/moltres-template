module.exports = {
  name: 'moltres-tools',
  version: '0.2.0',
  'description': 'Tools for managing a Moltres app',
  'main': './dist/index.js',
  'license': 'Apache-2.0',
  'repository': {
    'type': 'git',
    'url': 'git+https://github.com/brianneisler/moltres.git'
  },
  'author': 'Brian Neisler <hello@brianneisler.com>',
  'homepage': 'https://github.com/brianneisler/moltres/tree/master/tools#readme',
  'bugs': {
    'url': 'https://github.com/brianneisler/moltres/issues'
  },
  'keywords': [
    'CMS',
    'moltres',
    'redux'
  ],
  scripts: {
    build: 'bash ./scripts/build.sh',
    clean: 'bash ./scripts/clean.sh',
    cleanse: 'bash ./scripts/cleanse.sh',
    deploy: 'bash ./scripts/deploy.sh',
    'docs:gen': 'bash ./scripts/docs-gen.sh',
    lint: 'bash ./scripts/lint.sh',
    predeploy: 'bash ./scripts/predeploy.sh',
    setup: 'bash ./scripts/setup.sh',
    test: 'bash ./scripts/test.sh',
    update: 'bash ./scripts/update.sh',
    'version:major': 'bash ./scripts/version.sh major',
    'version:minor': 'bash ./scripts/version.sh minor',
    'version:patch': 'bash ./scripts/version.sh patch',
    'watch:build': 'bash ./scripts/watch-build.sh',
    'watch:test': 'bash ./scripts/watch-test.sh'
  },
  dependencies: {
    '@babel/cli': '^7.1.5',
    '@babel/core': '^7.1.6',
    'dotenv': '^6.1.0',
    dox: '^0.9.0',
    'eslint': '^5.9.0',
    'fs-extra': '^7.0.1',
    glob: '^7.1.3',
    'moltres-utils': '0.2.x',
    'jest': '^23.6.0',
    'source-map-support': '^0.5.9'
  },
  devDependencies: {
    firebase: '^5.5.8',
    'firebase-admin': '^6.1.0'
  }
}
