const { spawn } = require('child_process')
const { resolve } = require('path')

const build = (path, name) => {
  const watcher = spawn('npm', [ 'run', 'watch:build' ], {
    cwd: resolve(process.cwd(), path)
  })

  watcher.stdout.on('data', (data) => {
    console.log((`${name}: ${data}`).trim()) // eslint-disable-line no-console
  })

  watcher.stderr.on('data', (data) => {
    console.log((`${name} ERROR: ${data}`).trim()) // eslint-disable-line no-console
  })

  watcher.on('close', (code) => {
    console.log((`${name} watcher exited with ${code}`).trim()) // eslint-disable-line no-console
  })
}

module.exports = build
