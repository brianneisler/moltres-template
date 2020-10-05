import { queueAction } from '../../core/sdk'
import { actions, schemas } from '../modules/storage'
import setupFunctionContexts from '../setupFunctionContexts'

const setupStorageMetadataUpdateFunction = (modules, config) => async (
  object
) => {
  const { context } = await setupFunctionContexts(
    config,
    'storage_metadata_update'
  )
  context.logger.info('object metadata update received - object:', object)
  await queueAction(
    schemas.StorageObjectMetadataUpdateAction,
    context,
    actions.storageObjectMetadataUpdate(context, {
      ...object,
      metageneration: parseInt(object.metageneration),
      size: parseInt(object.size)
    })
  )
}

export default setupStorageMetadataUpdateFunction
