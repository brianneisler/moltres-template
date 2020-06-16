import { basename, join, resolve } from 'path'
import { dropWhile, filter, map, reduce } from 'ramda'
import { findVariableById, setVariable } from '../../src/db/Variable'
import { readdir } from 'fs-extra'
import setupScriptContexts from './utils/setupScriptContexts'

const loadMigrations = async (dir) => {
  const fileNames = await readdir(dir)
  const migrations = map((file) => {
    return {
      file,
      id: basename(file, '.js'),
      ...require(join(dir, file))
    }
  }, filter((file) => file.match(/^\d+.*\.js$/), fileNames).sort())
  return migrations
}

const VARIABLE_DATABASE_MIGRATION_ID = 'DATABASE_MIGRATION_ID'
const migrateUp = async () => {
  const { adminContext, context } = await setupScriptContexts()
  const { logger } = context

  let currentDatabaseMigrationId = await findVariableById(
    context,
    VARIABLE_DATABASE_MIGRATION_ID
  )

  if (currentDatabaseMigrationId) {
    logger.info(
      `Database is currently at migration id "${currentDatabaseMigrationId.value}"`
    )
  }
  const dir = resolve(__dirname, '..', '..', 'migrations')
  let migrations = await loadMigrations(dir)

  if (currentDatabaseMigrationId) {
    migrations = dropWhile(
      (migration) => migration.id <= currentDatabaseMigrationId.value,
      migrations
    )
  }
  logger.info('remaining migrations:', migrations)

  await reduce(
    async (promise, migration) => {
      await promise
      logger.info(`Starting migration ${migration.file}`)
      try {
        await migration.up(context, adminContext)
        logger.info(`migration completed ${migration.file}`)
        currentDatabaseMigrationId = await setVariable(
          context,
          VARIABLE_DATABASE_MIGRATION_ID,
          {
            ...(currentDatabaseMigrationId ? currentDatabaseMigrationId : {}),
            value: migration.id
          }
        )
      } catch (error) {
        logger.warn(
          `An error occurred while running the migration script ${migration.file}. Stopping migration....`
        )
        throw error
      }
    },
    null,
    migrations
  )
  process.exit()
}

migrateUp().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error)
  process.exit(1)
})
