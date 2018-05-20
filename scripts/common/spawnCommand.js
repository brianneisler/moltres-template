const { spawn } = require('child_process')
const { trim } = require('ramda')

const spawnCommand = async (command, args, options) => {
  const commandProcess = spawn(command, args, options)
  return new Promise((resolve, reject) => {
    commandProcess.stdout.on('data', (data) => {
      console.log(trim(data.toString())) // eslint-disable-line no-console
    })
    commandProcess.stderr.on('data', (data) => {
      console.log(trim(data.toString())) // eslint-disable-line no-console
    })
    commandProcess.on('error', (error) => {
      return reject(error)
    })
    commandProcess.on('close', (code) => {
      if (code) {
        return reject(new Error('Command errored'))
      }
      return resolve()
    })
  })
}

module.exports = spawnCommand