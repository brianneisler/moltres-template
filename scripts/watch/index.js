const { spawn } = require('child_process')
const { resolve } = require('path')
const { forEachObjIndexed } = require('ramda')

const projects = {
  'cli': './cli',
  'core': './core'
}

forEachObjIndexed((path, name) => {
  const watcher = spawn('npm', [ 'run', 'watch' ], {
    cwd: resolve(process.cwd(), path)
  })

  watcher.stdout.on('data', (data) => {
    console.log(`${name}: ${data}`) // eslint-disable-line no-console
  })

  watcher.stderr.on('data', (data) => {
    console.log(`${name} ERROR: ${data}`) // eslint-disable-line no-console
  })

  watcher.on('close', (code) => {
    console.log(`${name} watcher exited with ${code}`) // eslint-disable-line no-console
  })
}, projects)
