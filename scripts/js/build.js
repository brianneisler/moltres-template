import { resolve } from 'path'

import { outputJson } from 'fs-extra'

import loadDotEnv from '../../src/utils/config/loadDotEnv'

const build = async () => {
  const stage = process.env.STAGE
  const env = loadDotEnv(resolve(__dirname, '..', '..'), { stage })
  await outputJson(
    resolve(__dirname, '..', '..', 'private', 'dist', `config.json`),
    env,
    {
      spaces: 2
    }
  )
}

build().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error)
  process.exit(1)
})
