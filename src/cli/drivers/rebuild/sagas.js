import _ from 'mudash'
import fse from 'fs-extra'
import path from 'path'
import Promise from 'bluebird'
import { takeEvery } from 'redux-saga'
import { call } from 'redux-saga/effects'
import { rebuildDependencies } from './actions'

export default function* root() {
  yield [
    takeEvery(rebuildDependencies.toString(), handleRebuildDependencies)
  ]
}

function* handleRebuildDependencies({payload}) {
  let { path: targetPath } = payload
  if (!path.isAbsolute(targetPath)) {
    targetPath = path.resolve(process.cwd(), targetPath)
  }
  yield* doRebuildDependencies(targetPath)
}

function *doRebuildDependencies(targetPath) {
  const moltresModules = yield call(findMoltresModules, targetPath)
  return moltresModules
}

async function findMoltresModules(targetPath) {
  const jsonFiles = await findMoltresJsonFiles(targetPath)
  return jsonFiles
  // const modules = await Promise.all(_.map(files, async (file) => {
  //   const modulePath = path.resolve(target, file)
  //   const stat = await fs.stat(path.resolve(target, file))
  //   if (stat.isDirectory()) {
  //     return {
  //       name: file,
  //       path:modulePath
  //     }
  //   }
  // }))
  // let output = HEADER_TEMPLATE()
  // let exports = []
  // _.each(_.compact(modules), (module) => {
  //   output += REQUIRE_TEMPLATE(module)
  //   exports = _.push(exports, EXPORT_TEMPLATE(module))
  // })
  // output += EXPORTS_TEMPLATE({exports})
  // generateFolderIndex(path.resolve(__dirname, '../../moltres-projects/components'))

}

const MOLTRES_TYPES = {
  app: 'app',
  component: 'component',
  driver: 'driver',
  flareon: 'flareon',
  plugin: 'plugin',
  scene: 'scene'
}
function findMoltresJsonFiles(targetPath) {
  return new Promise((resolve) => {
    const items = []
    fse.walk(targetPath)
      .on('readable', function() {
        let item
        while ((item = this.read())) {
          if (isMoltresFileName(item.path)) {
            items.push(item.path)
          }
        }
      })
      .on('end', function () {
        resolve(items)
      })
  })
}

function isMoltresFileName(itemPath) {
  return path.extname(itemPath) === '.json' && _.has(MOLTRES_TYPES, path.basename(itemPath, '.json'))
}
