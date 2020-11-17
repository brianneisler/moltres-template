import { queueAction } from 'moltres/core'
import { actions, schemas } from '../modules/storage'
import setupFunctionContexts from '../setupFunctionContexts'

const setupStorageDeleteFunction = (modules, config) => async (object) => {
  const { context } = await setupFunctionContexts(config, 'storage_delete')
  context.logger.info('object delete received - object:', object)
  await queueAction(
    schemas.StorageObjectDeleteAction,
    context,
    actions.storageObjectDelete(context, {
      ...object,
      metageneration: parseInt(object.metageneration),
      size: parseInt(object.size)
    })
  )
}

export default setupStorageDeleteFunction
