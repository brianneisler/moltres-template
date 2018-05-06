const { spawn } = require('child_process')
const fs = require('fs')
const { join } = require('path')
const os = require('os')

const modulesPath = path.resolve(__dirname, join('..', '..', 'modules'))

fs.readdirSync(modulesPath).forEach((mod) => {
  console.log('mod:', mod)
  if (mod !== 'scripts') {
    const modulePath = join(registry, mod)
    if (fs.existsSync(join(modulePath, 'package.json'))) {
      const npmCommand = os.platform().startsWith('win') ? 'npm.cmd' : 'npm'
      const install = spawn(npmCommand, [ 'i' ], { env: process.env, cwd: modulePath })
      install.stdout.on('data', (data) => {
        console.log(data.toString()) // eslint-disable-line no-console
      })
    }
  }
})
