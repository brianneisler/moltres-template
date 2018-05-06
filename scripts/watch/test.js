const { spawn } = require('child_process')
const { resolve } = require('path')

const test = (path, name) => {
  const watcher = spawn('npm', [ 'run', 'watch:test' ], {
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
}

module.exports = test
