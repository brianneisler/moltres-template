module.exports = {
  name: 'moltres-react',
  version: '0.2.0',
  description: 'React integration with moltres CMS',
  main: './dist/index.js',
  license: 'Apache-2.0',
  repository: {
    type: 'git',
    url: 'git+https://github.com/brianneisler/moltres.git'
  },
  author: 'Brian Neisler <hello@brianneisler.com>',
  homepage: 'https://github.com/brianneisler/moltres/tree/master/react#readme',
  bugs: {
    url: 'https://github.com/brianneisler/moltres/issues'
  },
  keywords: ['CMS', 'moltres', 'react'],
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
    'history': '^4.7.2',
    'moltres-utils': '0.2.x',
    'node-emoji': '^1.8.1',
    'prop-types': '^15.6.1',
    'react-native-config': '^0.11.5',
    'react-router-dom': '^4.2.2',
    'react-router-native': '^4.2.0',
    'recompose': '^0.27.1',
    'redux-form': '^7.3.0'
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
