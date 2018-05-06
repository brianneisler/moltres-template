import { spawn } from 'child_process'

const spawnCommand = async (command, args, options) => {
  const commandProcess = spawn(command, args, options)
  return new Promise((resolve, reject) => {
    commandProcess.stdout.on('data', (data) => {
      console.log(data.toString()) // eslint-disable-line no-console
    })
    commandProcess.stderr.on('data', (data) => {
      console.log(data.toString()) // eslint-disable-line no-console
    })
    commandProcess.on('close', (code) => {
      if (code) {
        return reject(new Error('Command errored'))
      }
      return resolve()
    })
  })
}

export default spawnCommand
