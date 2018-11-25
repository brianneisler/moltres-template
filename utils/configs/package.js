module.exports = {
  'name': 'moltres-utils',
  'version': '0.1.19',
  'description': 'Utils for Moltres apps',
  'main': './dist/index.js',
  'license': 'Apache-2.0',
  'repository': {
    'type': 'git',
    'url': 'git+https://github.com/brianneisler/moltres.git'
  },
  'author': 'Brian Neisler <hello@brianneisler.com>',
  'homepage': 'https://github.com/brianneisler/moltres/tree/master/utils#readme',
  'bugs': {
    'url': 'https://github.com/brianneisler/moltres/issues'
  },
  'keywords': [
    'CMS',
    'moltres',
    'redux',
    'utils'
  ],
  'scripts': {
    'build': 'bash ./scripts/build.sh',
    'clean': 'bash ./scripts/clean.sh',
    'cleanse': 'bash ./scripts/cleanse.sh',
    'deploy': 'bash ./scripts/deploy.sh',
    'docs:gen': 'bash ./scripts/docs-gen.sh',
    'lint': 'bash ./scripts/lint.sh',
    'predeploy': 'bash ./scripts/predeploy.sh',
    'setup': 'bash ./scripts/setup.sh',
    'test': 'bash ./scripts/test.sh',
    'update': 'bash ./scripts/update.sh',
    'version:major': 'bash ./scripts/version.sh major',
    'version:minor': 'bash ./scripts/version.sh minor',
    'version:patch': 'bash ./scripts/version.sh patch',
    'watch:build': 'bash ./scripts/watch-build.sh',
    'watch:test': 'bash ./scripts/watch-test.sh'
  },
  'dependencies': {
    'bluebird': '^3.5.1',
    'buffer': '^5.2.0',
    'cross-fetch': '^2.2.2',
    'crypto-js': '^3.1.9-1',
    'graphlib': '^2.1.5',
    'invariant': '^2.2.4',
    'is-url': '^1.2.4',
    'mime-types': '^2.1.19',
    'ramda': '^0.25.0',
    'readable-stream': '^2.3.6',
    'string-to-stream': '^1.1.1'
  },
  'devDependencies': {
    'caniuse-lite': '^1.0.30000907',
    'dox': '^0.9.0',
    'firebase': '^5.5.8',
    'firebase-admin': '^6.1.0',
    'glob': '^7.1.3'
  }
}
