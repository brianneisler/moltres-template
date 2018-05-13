import { join, resolve } from 'path'

const FIREBASE_DIR_NAME = 'firebase'
const MODULE_FILE_NAME = 'module.json'
const MODULES_DIR_NAME = 'modules'
const PLUGIN_FILE_NAME = 'plugin.json'
const PLUGINS_DIR = resolve(__dirname, '..', 'plugins')
const PROJECT_FILE_NAME = 'moltres.json'
const DEFAULT_PLUGINS = {
  build: join(PLUGINS_DIR, 'build'),
  clean: join(PLUGINS_DIR, 'clean'),
  cleanse: join(PLUGINS_DIR, 'cleanse'),
  deploy: join(PLUGINS_DIR, 'deploy'),
  lint: join(PLUGINS_DIR, 'lint'),
  run: join(PLUGINS_DIR, 'run'),
  setup: join(PLUGINS_DIR, 'setup'),
  start: join(PLUGINS_DIR, 'start'),
  test: join(PLUGINS_DIR, 'test')
}

export {
  DEFAULT_PLUGINS,
  FIREBASE_DIR_NAME,
  MODULE_FILE_NAME,
  MODULES_DIR_NAME,
  PLUGIN_FILE_NAME,
  PLUGINS_DIR,
  PROJECT_FILE_NAME
}
