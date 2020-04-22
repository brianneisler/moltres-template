import { StorageObjectMetadataUpdateAction } from '../schemas'
import { actionBuilder } from '../../../../utils/lang'

const storageObjectMetadataUpdate = actionBuilder({
  Schema: StorageObjectMetadataUpdateAction
})

export default storageObjectMetadataUpdate
