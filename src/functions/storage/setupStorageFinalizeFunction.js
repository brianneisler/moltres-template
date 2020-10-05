import { queueAction } from '../../core/sdk'
import { actions, schemas } from '../modules/storage'
import setupFunctionContexts from '../setupFunctionContexts'

const setupStorageFinalizeFunction = (modules, config) => async (object) => {
  const { context } = await setupFunctionContexts(config, 'storage_finalize')
  context.logger.info('object finalize received - object:', object)
  await queueAction(
    schemas.StorageObjectFinalizeAction,
    context,
    actions.storageObjectFinalize(context, {
      ...object,
      metageneration: parseInt(object.metageneration),
      size: parseInt(object.size)
    })
  )
}

export default setupStorageFinalizeFunction
