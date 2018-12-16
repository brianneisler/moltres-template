module.exports = {
  name: 'moltres-test',
  version: '0.2.0',
  description: 'Testing utils for moltres',
  main: './dist/index.js',
  license: 'Apache-2.0',
  repository: {
    type: 'git',
    url: 'git+https://github.com/brianneisler/moltres.git'
  },
  author: 'Brian Neisler <hello@brianneisler.com>',
  homepage: 'https://github.com/brianneisler/moltres/tree/master/test#readme',
  bugs: {
    url: 'https://github.com/brianneisler/moltres/issues'
  },
  keywords: ['CMS', 'firebase', 'moltres', 'testing'],
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
    bluebird: '^3.5.1',
    dotenv: '^5.0.1',
    'firebase-admin': '^5.12.1',
    'moltres-utils': '0.2.x',
    'source-map-support': '^0.5.5'
  },
  devDependencies: {
    'caniuse-lite': '^1.0.30000907',
    firebase: '^5.2.0',
    moltres: '0.2.x'
  },
  peerDependencies: {
    firebase: '>=3 <=5',
    moltres: '>=0.2.0'
  }
}
