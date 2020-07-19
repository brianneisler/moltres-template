import { resolve } from 'path'

import { ensureFile, writeFile } from 'fs-extra'

const TEMPLATE = [
  'const up = async (context) => {',
  '  // your up migration',
  '}',
  '',
  'const down = async(context) => {',
  '  // your down migration ',
  '}',
  '',
  'export {',
  '  up,',
  '  down',
  '}',
  ''
].join('\n')

const MIGRATIONS_PATH = resolve(__dirname, '..', '..', 'migrations')

const migrationCreate = async (name) => {
  if (!name) {
    throw new Error('migration name is required')
  }
  const now = Date.now()
  const migrationFileName = `${now}-${name}.js`
  const migrationFilePath = resolve(MIGRATIONS_PATH, migrationFileName)
  await ensureFile(migrationFilePath)
  await writeFile(migrationFilePath, TEMPLATE)

  // eslint-disable-next-line no-console
  console.log(`migration file generated ${migrationFilePath}`)
}

migrationCreate(process.argv[2]).catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error)
  process.exit(1)
})
