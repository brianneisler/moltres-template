import { resolve } from 'path'

import loadEnv from '../../src/utils/config/loadEnv'

const { log } = console
// Silence log since we're using this for stdout
// eslint-disable-next-line no-console
console.log = () => {}

const exec = async (stage, key) => {
  const env = loadEnv(resolve(__dirname, '..', '..'), { stage })
  if (env[key]) {
    log(env[key])
  }
  process.exit()
}

exec(process.argv[2], process.argv[3]).catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error)
  process.exit(1)
})
